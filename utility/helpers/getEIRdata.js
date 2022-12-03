const { default: axios } = require("axios");
const inGateOutGate = require("../../IngateOutgate");
const { allPorts } = require("../payload/ports");
const { errorMessage } = require("./errorHandling");

const noEIRPort = [""];
const getEIRdata = async (
  containerNo,
  portName,
  timeZone,
  terminal,
  credentialData = [],
  isMain = false
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
      if (isMain || portCode !== portName) {
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

    response = response?.filter((r) => Object.keys(r.container).length > 1);
    const dublicateContainer = [];
    const foundContainers = [];
    containerNo.forEach((element) => {
      let container = {};
      response.forEach((e) => {
        if (element === e?.container?.containerNo) {
          container.containerNo = element;
          if (e.container.inGate) {
            container.inGate = e.container.inGate;
            container.terminatedDate = e.container.terminatedDate;
            if (e.container.emptyReturnLocation) {
              container.emptyReturnLocation = e.container.emptyReturnLocation;
            }
            container.status = "Terminated";
          }
          if (e.container.outGate) {
            container.outGate = e.container.outGate;
            container.outGateDate = e.container.outGateDate;
            if (e.container.emptyReturnLocation) {
              container.emptyReturnLocation = e.container.emptyReturnLocation;
            }
            if (!container.inGate) container.status = "Outgated";
          }
        }
      });
      if (container.containerNo) {
        dublicateContainer.push({ container });
        foundContainers.push(container.containerNo);
      }
    });
    // console.log()
    if (isMain) {
      containerNo.map((cn) => {
        if (!foundContainers.includes(cn)) {
          dublicateContainer.push({
            container: {
              containerNo: cn,
              message: {
                caution: errorMessage("NODATAERROR").caution,
                message: errorMessage("NODATAERROR").message,
              },
            },
          });
        }
      });
    }

    return dublicateContainer;
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
