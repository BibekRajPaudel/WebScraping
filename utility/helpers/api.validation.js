let utilities = require("../payload/ports");
let validationMessage = require("../constant/validation.message.json");

let allPorts = utilities.allPorts;
let allSsls = utilities.allSsls;

const requiredValidation = function (payload) {
  let validationMsg = {
    errors: {},
  };
  let requiredData = [];
  let allValidationMessage = {};
  if (payload.port || payload.containerOwner) {
    let allPayloads = payload.containerOwner ? allSsls : allPorts;
    let code = payload.containerOwner ? payload.containerOwner : payload.port;
    // find the port or container owner from the standard list
    let foundVal = allPayloads.find((pp) =>
      pp.values
        ? pp.values.includes(code.toUpperCase()) // map the payload with list of codes
        : pp.code === code.toUpperCase()
    );

    if (!foundVal) {
      // Error msg if not found
      if (payload.port) {
        // requiredData = ["port"];
        allValidationMessage.port = validationMessage["portNotFound"];
      } else {
        // requiredData = ["containerOwner"];
        allValidationMessage.containerOwner =
          validationMessage["containerOwnerNotFound"];
      }
    } else {
      // For payload with containerOwner || eta
      if (payload.containerOwner) {
        requiredData = payload.isEmptyReturn
          ? foundVal.emptyRequired
          : foundVal.required;
        payload.type = payload.isEmptyReturn ? "isEmptyReturn" : "isEta";
        payload.containerOwner = foundVal.code
          .replace(/\s/g, "_")
          .toUpperCase();
        payload.values = foundVal.values;
      } else {
        // Payload with port || lfd or empty returns
        payload.port = foundVal.code.replace(/\s/g, "_").toUpperCase();
        requiredData = payload.containerOwner
          ? foundVal.required
          : foundVal.lfdRequired;
        payload.type = "islfd";
      }

      if (payload.isEmptyReturn) {
        requiredData = foundVal.emptyRequired;
        payload.type = "isEmptyReturn";
      }

      if (payload.isInGateOutGate) {
        requiredData = foundVal.IngateOutgaterequired;
        payload.type = "isInGateOutGate";
      } 
      if (payload.isInGateOutGateCron) {
        requiredData = foundVal.IngateOutgaterequired;
        payload.type = "isInGateOutGateCron";
      }

      if (payload.isVessel) {
        requiredData = foundVal.vesselRequired;
        payload.type = "isVessel";
      }
    }

    if (foundVal && foundVal.terminalId) {
      payload.terminalId = foundVal.terminalId;
    }

    // console.log(requiredData, allValidationMessage);
    requiredData.map((dataKey) => {
      if (payload[dataKey])
        requiredData = requiredData.filter((ii) => ii !== dataKey);
      else allValidationMessage[dataKey] = validationMessage[dataKey];
    });
    // return payload with standard names if no error in payload
    if (
      Object.keys(requiredData).length == 0 &&
      Object.keys(allValidationMessage).length == 0
    )
      return payload;
  } else {
    allValidationMessage.port = validationMessage["port"];
    allValidationMessage.containerOwner = validationMessage["containerOwner"];
  }

  validationMsg.errors = allValidationMessage;
  // Throw error if any
  throw validationMsg;
};

module.exports = requiredValidation;
