//This function is common utility function for momentjs in last_free_day

const _ = require("lodash");

const extraDataExtractor = (data, filteringParam) => {
  if (data) {
    return _.omit(data, filteringParam);
  } else {
    return data;
  }
};

module.exports = extraDataExtractor;
