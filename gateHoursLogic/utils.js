const moment = require("moment");

const splitTime = (time) => {
  const timeSplit = time.split("-");

  const firstTime = moment(timeSplit[0], "HHmm").format("hh:mm");

  const secondTime = moment(timeSplit[1], "HHmm").format("hh:mm");

  return `${firstTime} - ${secondTime}`;
};

module.exports = {
  splitTime,
};
