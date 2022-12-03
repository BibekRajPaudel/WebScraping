const checkContainer = (container) => {
  return /^(?=^.{11}$)[A-Z]{4}\d*$/.test(container);
};

module.exports = checkContainer;
