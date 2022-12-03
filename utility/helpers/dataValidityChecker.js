const moment = require("moment");

const dataValidityChecker = (
  timeDifferenceValue,
  timeDifferenceUnit,
  dateTimeFormat,
  dataDateValue,
  dateTocheck = null
) => {
  if (
    !dataDateValue ||
    dataDateValue === null ||
    dataDateValue === false ||
    dataDateValue === "" ||
    dataDateValue === " "
  ) {
    return true;
  }
  if (dataDateValue) {
    // Past Date
    let pastDate = dateTocheck ? moment(dateTocheck) : moment();
    pastDate = pastDate
      .subtract(timeDifferenceValue, timeDifferenceUnit)
      .format(dateTimeFormat);

    // let currentDate = dateTocheck ? moment(dateTocheck) : moment();
    // currentDate = currentDate
    //   .add(timeDifferenceValue, timeDifferenceUnit)
    //   .format(dateTimeFormat);

    // console.log(
    //   "currentDate",
    //   currentDate,
    //   pastDate,
    //   moment(dataDateValue).isBetween(pastDate, currentDate)
    // );
    return moment(dataDateValue).isAfter(pastDate)
    // return moment(dataDateValue).isBetween(pastDate, currentDate);
  }
};

module.exports = dataValidityChecker;
