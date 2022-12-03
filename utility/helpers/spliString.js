//This function can be used to split the string by new line and get the latter one

const splitString = (data) => {
  let dataValue;

  if (data) {
    dataValue = data
      .split(/(\r\n|\n|\r)/gm)
      .filter((e) => {
        return e.trim().length > 0;
      })[1]?.replace(/\B\s+|\s+\B/g, "");
  }

  return dataValue ? dataValue : "";
};

module.exports = splitString;
