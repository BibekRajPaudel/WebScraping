const standardType = require("../constant/standardType.json");

let getSizeAndType = (firstParameter, secondParameter) => {
  let sizeType = Object.keys(standardType).find((key) =>
    standardType[key].includes(
      secondParameter ? firstParameter + secondParameter : firstParameter
    )
  );
  let size = sizeType?.split(" ")[0];
  let type = sizeType?.split(" ")[1];
  return {
    size,
    type,
  };
};

module.exports = getSizeAndType;
