let log4js = require("log4js");
let logger = log4js.getLogger();
logger.level = "ALL";

async function handleError(port, containerNo, error) {
  return new Error(
    logger.error(
      `SCRAPE_FAILED:PORT:${port} with CONTAINERNO:${containerNo} has failed due to ${error}`
    )
  );
}

function errorMessage(whichError,errVal) {
  if (whichError == "LOGINERROR") {
    let error = {
      message: "Invalid login credentials in this Port's Profile",
      caution: true,
    };
    return error;
  }
  if (whichError == "NODATAERROR") {
    let error = {
      message: "Container's information not found on this Port's site",
      caution: true,
    };
    return error;
  }
  if (whichError == "FAILEDSCRAPE") {
    let error = {
      message: "Unable to successfully check Port's site",
      caution: true,
    };
    if(errVal){
      error.errVal = errVal.stack
    }
    return error;
  }
  if (whichError == "SESSIONERROR") {
    let error = {
      message: "Couldn't get Data due to Invalid Session",
      caution: true,
    };
    return error;
  }
}

const ADDITIONAL_ERROR = {
  0: "Could not find gate pass!",
  1: "Container Owner Not Found",
};

module.exports = { handleError, errorMessage, ADDITIONAL_ERROR };
