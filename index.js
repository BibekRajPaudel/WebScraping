const Q = require("q");
const {
  everportTerminalAsync,
  fenixAsync,
  apmTerminalAsync,
  lbctAsync,
  pctAsync,
  pierAAsync,
  ytiAsync,
  wbctAsync,
  ttiAsync,
  itsTerminalAsync,
  trapacAsync,
} = require("./losAngeles");

const gateHours = async () => {
  let allPromisesResolved;
  try {
    allPromisesResolved = await Q.all([
      apmTerminalAsync(),
      fenixAsync(),
      ttiAsync(),
      lbctAsync(),
      everportTerminalAsync(),
      pctAsync(),
      pierAAsync(),
      ytiAsync(),
      wbctAsync(),
      itsTerminalAsync(),
      trapacAsync(),
    ]);
    console.log(allPromisesResolved);

    return "done";
  } catch (error) {
    return resolve([error, null]);
  }
};

module.exports = gateHours;
