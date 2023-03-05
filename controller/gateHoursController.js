const moment = require('moment');
require('moment-timezone');
const GateModel = require('../model/gateHoursModel');

const getGateData = async port => {
    let allTrapac = [];
    const currentDate = moment().tz('America/Los_Angeles').subtract(7, 'hours');
    const from = currentDate.startOf('isoWeek').toISOString();
    const to = currentDate.endOf('isoWeek').toISOString();

    let createdTime = moment().tz('America/Los_Angeles').toISOString();

    const criteria = {
        createdTime: {
            $gte: from,
            $lte: to,
        },
    };

    const gateData = await GateModel?.find(criteria).sort({ createdAt: 1 }).lean();

    const responseData = gateData[gateData.length - 1];

    let trapacIndex;
    responseData?.data?.forEach(element => {
        if (element?.key === 'TRAPAC') {
            trapacIndex = responseData?.data?.indexOf(element);
        }
    });

    gateData?.forEach(data => {
        data?.data?.forEach(y => {
            if (y?.key === 'TRAPAC') {
                allTrapac = [...allTrapac, ...y.data.gateHours];
            }
        });
    });

    const filterTrapacData = allTrapac?.filter(
        filteredData =>
            filteredData.date && moment(filteredData.date).tz('America/Los_Angeles').isBefore(to)
    );

    const startOfWeekDate = moment(from).format('LL');
    const endOfWeekDate = moment(to).format('LL');

    const indexOfEndWeek = filterTrapacData.findIndex(text => text.date === endOfWeekDate);

    const indexOfStartWeek = filterTrapacData.findIndex(text => text.date === startOfWeekDate);
    if (indexOfEndWeek !== -1 && indexOfStartWeek !== -1) {
        const filterTrapacDataFinal = filterTrapacData.slice(indexOfStartWeek, indexOfEndWeek + 1);
        responseData.data[trapacIndex].data.gateHours = filterTrapacDataFinal;
    }

    if (port) {
        responseData.data = responseData?.data?.filter(fl => fl?.key === port);
    }

    return responseData;
};

const getGateHour = async (req, res, next) => {
    const { port } = req.query;

    const responseData = await getGateData(port);

    return res.json(responseData);
};

const postGateHour = async (req, res, next) => {
    try {
        let LAArray = Object.values(req.body.response);
        const LA = [];
        LAArray = LAArray.filter(element => element != 'true');

        if (req.body.response) {
            LAArray.map((value, index) => {
                if (value[1] != undefined) {
                    LA.push(value[1]);
                }
            });
        }

        const LApayload = {
            terminal: 'LA',
            data: LA,
            createdTime: moment().tz('America/Los_Angeles').toISOString(),
        };

        const LaEmptyData = new GateModel(LApayload);
        await LaEmptyData.save();
        return res.json({ message: 'success' });
    } catch (error) {
        return res.json({
            message: 'error updating container',
        });
    }
};

module.exports = {
    getGateHour,
    postGateHour,
    getGateData,
};
