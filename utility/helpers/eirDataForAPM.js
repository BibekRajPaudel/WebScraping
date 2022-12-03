const { default: axios } = require("axios");
const inGateOutGate = require("../../IngateOutgate");
const { allPorts } = require("../payload/ports");

const noEIRPort = [""];
const getEIRdata = async (
  containerNo,
  portName,
  timeZone,
  terminal,
  credentialData = []
) => {
  let response = [];
  let payload = {
    containerNo,
    timeZone,
  };
  try {
    let ports = allPorts.filter((data) => data.terminal == terminal);

    let allResponse = [];
    ports.map((port) => {
      let cred = credentialData
        ? credentialData.find((data) => data.code == port.code)
        : null;
      let portCode = port.code.replace(/\s/g, "_");
      if (portCode !== portName) {
        payload = { ...payload, port: portCode };
        payload.isInGateOutGate = true;
        if (cred) {
          payload.portUsername = cred.portUsername;
          payload.portPassword = cred.portPassword;
        }
        let requiredData = port.IngateOutgaterequired
          ? port.IngateOutgaterequired
          : [];
        requiredData.map((dataKey) => {
          if (payload[dataKey])
            requiredData = requiredData.filter((ii) => ii !== dataKey);
        });
        payload.port = payload.port.replace("_", " ");
        if (inGateOutGate[portCode] && Object.keys(requiredData).length == 0) {
          if (portCode === "APM") {
            allResponse.push(apmIngate(payload));
          } else {
            allResponse.push(allIngate(payload));
          }
        }
      }
    });

    let resp = await Promise.all(allResponse);
    resp.forEach((element) => {
      if (element && element.data) {
        response = [
          ...response,
          ...element.data.filter((dd) => !dd.container?.message),
        ];
      }
    });
    // let resp = await inGateOutGate["APM"](payload);
    return response;
  } catch (e) {
    console.log("e", e);
    return e;
  }
};

module.exports = getEIRdata;

const apmIngate = async (payload) => {
  try {
    let respose = await axios({
      method: "post",
      url: "http://35.212.86.145/api/",
      headers: {
        "Content-Type": "application/json",
      },
      data: payload,
    });
    return respose.data.response;
  } catch (err) {
    // console.log(err);
    return {};
  }
};
const allIngate = async (payload) => {
  try {
    let respose = await axios({
      method: "post",
      url: "https://trackos-dev-scraper.axle.network/api",
      headers: {
        "Content-Type": "application/json",
      },
      data: payload,
    });

    return respose.data.response;
  } catch (err) {
    // console.log(err);
    return {};
  }
};

