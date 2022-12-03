//This function is common utility function for momentjs in last_free_day

const moment = require("moment");
require("moment-timezone");

const timeZoneFormatter = (data, timeZone, momentFormat, startOfVar) => {
  if (data) {
    if (timeZone) {
      let dat;
      if (momentFormat && moment !== null) {
        data = moment(data, momentFormat);
      }
      if (startOfVar) {
        dat = moment.tz(data, timeZone).startOf(startOfVar);
      } else {
        dat = moment.tz(data, timeZone);
        dat.add(moment(data).tz(timeZone).utcOffset() * -1, "minutes");
      }

      return dat.toISOString();
    } else {
      let dateConv = moment(data);

      return dateConv.toISOString();
    }
  }
};

module.exports = timeZoneFormatter;
