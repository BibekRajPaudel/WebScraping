let laPorts = require("./la-port.json");
let nyPorts = require("./ny-port.json");
let other = require("./other.json");

// const NJ = ["APM", "MAHER", "PNCT", "GLOBAL", "NYCT"];
let others = require("./others.json");

let allSsls = require("./ssl.json");

const allPorts = [...laPorts, ...nyPorts, ...others, ...other];

module.exports = {
  allPorts,
  allSsls,
};
