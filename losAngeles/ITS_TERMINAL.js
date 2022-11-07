const utility = require("../../utility");
const payloads = require("../requestPayload");
const DOM_ELEMENTS = require("../DOM");
const {
  handleError,
  errorMessage,
} = require("../../utility/helpers/errorHandling");
const { staticDay2 } = require("../constant");

const ITS_TERMINAL = async () => {
  const browser = await utility.browser();
  let firstShift = [];
  let secondShift = [];
  let shiftArray = [];
  try {
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(0);
    await page.goto(payloads["ITS_TERMINAL"][0]);

    await page.addScriptTag({ url: payloads["ITS_TERMINAL"][1] });

    let rawData = await page.evaluate((DOM_ELEMENTS) => {
      return $(DOM_ELEMENTS.ITS_TERMINAL[0])
        .find(DOM_ELEMENTS.ITS_TERMINAL[1])
        .map(function () {
          return $(this).text().trim().replaceAll(/\t|\n/g, " ");
        })
        .get();
    }, DOM_ELEMENTS);

    //for monday to thursday
    firstShift = rawData.slice(1, 3).toString();
    secondShift = rawData.slice(3, 5).toString();

    const firstStatus = firstShift.includes("Full") ? "OPEN" : "CLOSED";
    const secondStatus =
      secondShift.includes("Off") || firstShift.includes("End")
        ? "OPEN"
        : "CLOSED";

    staticDay2.map((item, index) => {
      shiftArray.push({
        day: item,
        shift1: "07:00-17:00",
        shift2: "17:00-03:00",
        status1: firstStatus,
        status2: secondStatus,
      });
    });

    //For Friday
    shiftArray.push({
      day: "Friday",
      shift1: "07:00-17:00",
      shift2: "17:00-03:00",
      status1: "OPEN",
      status2: "OPEN",
    });

    //For Saturday
    shiftArray.push({
      day: "Saturday",
      shift1: "07:00-17:00",
      shift2: "17:00-03:00",
      status1: "CLOSED",
      status2: "CLOSED",
    });

    //For Sunday
    shiftArray.push({
      day: "Sunday",
      shift1: "07:00-17:00",
      shift2: "17:00-03:00",
      status1: "CLOSED",
      status2: "CLOSED",
    });

    return {
      gateHours: shiftArray,
    };
  } catch (error) {
    await browser.close();
    handleError(error);
    return errorMessage("FAILEDSCRAPE");
  }
};

module.exports = ITS_TERMINAL;
