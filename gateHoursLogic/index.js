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


const gateHours = async (code) => {
  let allPromisesResolved;
  try {
    if (code == 1) {
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
    }
    return allPromisesResolved;
  } catch (error) {
    return resolve([error, null]);
  }
};

module.exports = gateHours;
