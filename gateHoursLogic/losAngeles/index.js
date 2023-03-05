const APM_TERMINAL = require("./APM_TERMINAL");
const FENIX = require("./FENIX");
const ITS_TERMINAL = require("./ITS_TERMINAL");
const PIER_A = require("./PIER_A");
const TRAPAC = require("./TRAPAC");
const TTI = require("./TTI");
const WBCT = require("./WBCT");
const YTI = require("./YTI");
const PCT = require("./PCT");
const EVERPORT_TERMINAL = require("./EVERPORT_TERMINAL");
const LBCT = require("./LBCT");

const apmTerminalAsync = () =>
  new Promise(async (resolve) => {
    try {
      const data = await APM_TERMINAL();
      if (data) return resolve([null, { key: "APM_TERMINAL", data }]);
      resolve(["no response", null]);
    } catch (error) {
      return resolve([error, null]);
    }
  });

const everportTerminalAsync = function () {
  return new Promise(async (resolve) => {
    try {
      const data = await EVERPORT_TERMINAL();
      if (data) return resolve([null, { key: "EVERPORT TERMINAL", data }]);
      resolve(["no response", null]);
    } catch (error) {
      return resolve([error, null]);
    }
  });
};

const fenixAsync = () =>
  new Promise(async (resolve) => {
    try {
      const data = await FENIX();
      if (data) return resolve([null, { key: "FENIX", data }]);
      resolve(["no response", null]);
    } catch (error) {
      return resolve([error, null]);
    }
  });

const itsTerminalAsync = () =>
  new Promise(async (resolve) => {
    try {
      const data = await ITS_TERMINAL();
      if (data) return resolve([null, { key: "ITS_TERMINAL", data }]);
      resolve(["no response", null]);
    } catch (error) {
      return resolve([error, null]);
    }
  });

const lbctAsync = () =>
  new Promise(async (resolve) => {
    try {
      const data = await LBCT();
      if (data) return resolve([null, { key: "LBCT", data }]);
      resolve(["no response", null]);
    } catch (error) {
      return resolve([error, null]);
    }
  });

const pctAsync = () =>
  new Promise(async (resolve) => {
    try {
      const data = await PCT();
      if (data) return resolve([null, { key: "PCT", data }]);
      resolve(["no response", null]);
    } catch (error) {
      return resolve([error, null]);
    }
  });

const pierAAsync = () =>
  new Promise(async (resolve) => {
    try {
      const data = await PIER_A();
      if (data) return resolve([null, { key: "PIER_A", data }]);
      resolve(["no response", null]);
    } catch (error) {
      return resolve([error, null]);
    }
  });

const trapacAsync = () =>
  new Promise(async (resolve) => {
    try {
      const data = await TRAPAC();
      if (data) return resolve([null, { key: "TRAPAC", data }]);
      resolve(["no response", null]);
    } catch (error) {
      return resolve([error, null]);
    }
  });

const ttiAsync = () =>
  new Promise(async (resolve) => {
    try {
      const data = await TTI();
      if (data) return resolve([null, { key: "TTI", data }]);
      resolve(["no response", null]);
    } catch (error) {
      return resolve([error, null]);
    }
  });

const wbctAsync = () =>
  new Promise(async (resolve) => {
    try {
      const data = await WBCT();
      if (data) return resolve([null, { key: "WBCT", data }]);
      resolve(["no response", null]);
    } catch (error) {
      return resolve([error, null]);
    }
  });

const ytiAsync = () =>
  new Promise(async (resolve) => {
    try {
      const data = await YTI();
      if (data) return resolve([null, { key: "YTI", data }]);
      resolve(["no response", null]);
    } catch (error) {
      return resolve([error, null]);
    }
  });

module.exports = {
  ytiAsync,
  wbctAsync,
  ttiAsync,
  trapacAsync,
  apmTerminalAsync,
  everportTerminalAsync,
  itsTerminalAsync,
  lbctAsync,
  fenixAsync,
  pctAsync,
  pierAAsync,
};
