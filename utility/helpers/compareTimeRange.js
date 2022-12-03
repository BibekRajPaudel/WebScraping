const moment = require('moment')
const shift = require('../constant/shift.json');

const compareTimeRange = (port) => {
    const time = moment().format('HH:mm');
    const format = 'HH:mm:ss'
    let endingTime;
    let timeNow = moment(time, format);
    const midnight = moment("00:00", format);
    const morning = moment(shift[port]['1st']['start-time'], format)
    let data;

    // if date is after midnigh  then get tomorrow's date
    if (timeNow.isBetween(midnight, morning)) {
        timeNow = moment(time, format).add(1, "days");  
    }
    // map shift data 
    Object.values(shift[port]).map((values, index) => {
        startTime = values['start-time'];
        endTime = values['end-time'];
        const beginningTime = moment(startTime, format);

        // assuming shift 2 ending Time extends tomorrow
        if (values['shift'] === 2) {
            endingTime = moment(endTime, format).add(1, "days");
        } else {
            endingTime = moment(endTime, format);
        }
        // compare time range
        if (timeNow.isBetween(beginningTime, endingTime) || timeNow.isSame(beginningTime)) {
            data =  values['shift'];
        } 
    })
    return data    
}

module.exports = compareTimeRange
