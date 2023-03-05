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

   let response = {
                "0": [
                    null,
                    {
                        "key": "APM_TERMINAL",
                        "data": {
                            "gateHours": []
                        }
                    }
                ],
                "1": [
                    null,
                    {
                        "key": "TTI",
                        "data": {
                            "gateHours": []
                        }
                    }
                ],
                "2": [
                    null,
                    {
                        "key": "LBCT",
                        "data": {
                            "gateHours": [
                                {
                                    "day": "Monday 2/27",
                                    "shift1": "07:00 - 04:30",
                                    "shift2": "05:00 - 02:15",
                                    "status1": "OPEN",
                                    "status2": "OPEN"
                                },
                                {
                                    "day": "Tuesday 2/28",
                                    "shift1": "07:00 - 04:30",
                                    "shift2": "05:00 - 02:15",
                                    "status1": "OPEN​​​​",
                                    "status2": "OPEN​​​"
                                },
                                {
                                    "day": "Wednesday 3/1",
                                    "shift1": "07:00 - 04:30",
                                    "shift2": "05:00 - 02:15",
                                    "status1": "​OPEN​",
                                    "status2": "​OPEN​​​​"
                                },
                                {
                                    "day": "Thursday 3/2",
                                    "shift1": "07:00 - 04:30",
                                    "shift2": "05:00 - 02:15",
                                    "status1": "OPEN",
                                    "status2": "​​​OPEN"
                                },
                                {
                                    "day": "Friday 3/3",
                                    "shift1": "07:00 - 04:30",
                                    "shift2": "05:00 - 02:15",
                                    "status1": "OPEN",
                                    "status2": "​CLOSED​​​​​​"
                                },
                                {
                                    "day": "Saturday 3/4",
                                    "shift1": "07:00 - 04:30",
                                    "shift2": "05:00 - 02:15",
                                    "status1": "CLOSED",
                                    "status2": "CLOSED"
                                },
                                {
                                    "day": "​​​​Sunday 3/5",
                                    "shift1": "07:00 - 04:30",
                                    "shift2": "05:00 - 02:15",
                                    "status1": "​​CLOSED",
                                    "status2": "CLOSED​​​​"
                                },
                                {
                                    "day": "​Monday 3/6",
                                    "shift1": "07:00 - 04:30",
                                    "shift2": "05:00 - 02:15",
                                    "status1": "​​OPEN",
                                    "status2": "​​​OPEN"
                                }
                            ]
                        }
                    }
                ],
                "3": [
                    null,
                    {
                        "key": "EVERPORT TERMINAL",
                        "data": {
                            "gateHours": []
                        }
                    }
                ],
                "4": [
                    null,
                    {
                        "key": "PCT",
                        "data": {
                            "gateHours": []
                        }
                    }
                ],
                "5": [
                    null,
                    {
                        "key": "PIER_A",
                        "data": {
                            "gateHours": []
                        }
                    }
                ],
                "6": [
                    null,
                    {
                        "key": "YTI",
                        "data": {}
                    }
                ],
                "7": [
                    null,
                    {
                        "key": "WBCT",
                        "data": {
                            "gateHours": [
                                {
                                    "day": "Monday",
                                    "shift1": "07:00-17:00",
                                    "shift2": "17:00-03:00",
                                    "status1": "Open",
                                    "status2": "CLOSED"
                                },
                                {
                                    "day": "Tuesday",
                                    "shift1": "07:00-17:00",
                                    "shift2": "17:00-03:00",
                                    "status1": "CLOSED",
                                    "status2": "Open"
                                },
                                {
                                    "day": "Wednesday",
                                    "shift1": "07:00-17:00",
                                    "shift2": "17:00-03:00",
                                    "status1": "Open",
                                    "status2": "Open"
                                },
                                {
                                    "day": "Thursday",
                                    "shift1": "07:00-17:00",
                                    "shift2": "17:00-03:00",
                                    "status1": "Open",
                                    "status2": "CLOSED"
                                },
                                {
                                    "day": "Friday",
                                    "shift1": "07:00-17:00",
                                    "shift2": "17:00-03:00",
                                    "status1": "Open",
                                    "status2": "CLOSED"
                                },
                                {
                                    "day": "Saturday",
                                    "shift1": "07:00-17:00",
                                    "shift2": "17:00-03:00",
                                    "status1": "CLOSED",
                                    "status2": "CLOSED"
                                },
                                {
                                    "day": "Sunday",
                                    "shift1": "07:00-17:00",
                                    "shift2": "17:00-03:00",
                                    "status1": "CLOSED",
                                    "status2": "CLOSED"
                                }
                            ]
                        }
                    }
                ],
                "8": [
                    null,
                    {
                        "key": "ITS_TERMINAL",
                        "data": {
                            "gateHours": [
                                {
                                    "day": "Monday",
                                    "shift1": "07:00-17:00",
                                    "shift2": "17:00-03:00",
                                    "status1": "OPEN",
                                    "status2": "OPEN"
                                },
                                {
                                    "day": "Tuesday",
                                    "shift1": "07:00-17:00",
                                    "shift2": "17:00-03:00",
                                    "status1": "OPEN",
                                    "status2": "OPEN"
                                },
                                {
                                    "day": "Wednesday",
                                    "shift1": "07:00-17:00",
                                    "shift2": "17:00-03:00",
                                    "status1": "OPEN",
                                    "status2": "OPEN"
                                },
                                {
                                    "day": "Thursday",
                                    "shift1": "07:00-17:00",
                                    "shift2": "17:00-03:00",
                                    "status1": "OPEN",
                                    "status2": "OPEN"
                                },
                                {
                                    "day": "Friday",
                                    "shift1": "07:00-17:00",
                                    "shift2": "17:00-03:00",
                                    "status1": "OPEN",
                                    "status2": "OPEN"
                                },
                                {
                                    "day": "Saturday",
                                    "shift1": "07:00-17:00",
                                    "shift2": "17:00-03:00",
                                    "status1": "CLOSED",
                                    "status2": "CLOSED"
                                },
                                {
                                    "day": "Sunday",
                                    "shift1": "07:00-17:00",
                                    "shift2": "17:00-03:00",
                                    "status1": "CLOSED",
                                    "status2": "CLOSED"
                                }
                            ]
                        }
                    }
                ],
                "9": [
                    null,
                    {
                        "key": "TRAPAC",
                        "data": {
                            "gateHours": [
                                {
                                    "day": "Sunday",
                                    "shift1": "07:00 - 17:00",
                                    "status1": "Open - Automation only No flip operation",
                                    "shift2": "17:00 - 03:00",
                                    "status2": "Closed"
                                },
                                {
                                    "day": "Monday",
                                    "shift1": "07:00 - 17:00",
                                    "status1": "Open- Full Yard & Gate----YES Flip Operation (Chassis to Chassis)",
                                    "shift2": "17:00 - 03:00",
                                    "status2": "Open -Full Yard & Gate ---- YES Flip Operation (Chassis to Chassis)",
                                    "shift3": "03:00 - 07:00",
                                    "status3": "Shift Hoot gate Automation only No CU line empty returns /No Live reefers"
                                },
                                {
                                    "day": "Tuesday",
                                    "shift1": "07:00 - 17:00",
                                    "status1": "Open- Full Yard & Gate----Yes Flip Operation (Chassis to Chassis)",
                                    "shift2": "17:00 - 03:00",
                                    "status2": "Open - Full Yard & Gate ---No Flip Operation ( chassis to chassis)"
                                },
                                {
                                    "day": "Wednesday",
                                    "shift1": "07:00 - 17:00",
                                    "status1": "Open- Full Yard & Gate-----No Flip Operation (Chassis to Chassis) *No Flip Operation from 1000-1200*",
                                    "shift2": "17:00 - 03:00",
                                    "status2": "Open- Full Yard & Gate-----YES Flip Operation (Chassis to Chassis)",
                                    "shift3": "03:00 - 07:00",
                                    "status3": "shift Hoot gate Automation only No CU line empty returns /No Live reefers"
                                },
                                {
                                    "day": "Thursday",
                                    "shift1": "07:00 - 17:00",
                                    "status1": "Open- Full Yard & Gate-----YES Flip Operation (Chassis to Chassis) *No Flip Operation from 1000-1200*",
                                    "shift2": "18:00 - 03:00",
                                    "status2": "Open-Automation only No Flip operation"
                                },
                                {
                                    "day": "Friday",
                                    "shift1": "07:00 - 17:00",
                                    "status1": "Open- Full Yard & Gate-----YES Flip Operation (Chassis to Chassis) *No Flip Operation from 1000-1200*",
                                    "shift2": "17:00 - 03:00",
                                    "status2": "Open - Automation only No flip operation"
                                },
                                {
                                    "day": "Saturday",
                                    "shift1": "07:00 - 17:00",
                                    "status1": "Open - Automation Only No Flip Operation (Chassis to Chassis)",
                                    "shift2": "17:00 - 03:00",
                                    "status2": "Closed"
                                }
                            ]
                        }
                    }
                ]
        }
    try {
        let LAArray = Object.values(response);
        const LA = [];
        LAArray = LAArray.filter(element => element != 'true');
    
        if (response) {
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
