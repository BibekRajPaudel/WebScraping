const utility = require("../../utility");
const payloads = require("../requestPayload");
const DOM_ELEMENTS = require("../DOM");
const {
  handleError,
  errorMessage,
} = require("../../utility/helpers/errorHandling");
const moment = require("moment");
const { laTimeZone } = require("../constant");
require("moment-timezone");

const EVERPORT_TERMINAL = async () => {
  const browser = await utility.browser();
  let ourData = [];

  const nowDate = moment().tz(laTimeZone).format("MM/DD");

  try {
    const page = await browser.newPage();
    await page.goto(payloads["EVERPORT_TERMINAL"][0]);
    await page.waitForSelector(DOM_ELEMENTS.EVERPORT_TERMINAL[0]);
    await page.click(DOM_ELEMENTS.EVERPORT_TERMINAL[0]);

    let table1 = await page.evaluate((DOM_ELEMENTS) => {
      return $(DOM_ELEMENTS.EVERPORT_TERMINAL[1])
        .find(DOM_ELEMENTS.EVERPORT_TERMINAL[2])
        .map(function () {
          return $(this).text().trim().replaceAll(/\t|\n/g, " ");
        })
        .toArray();
    }, DOM_ELEMENTS);

    let table2 = await page.evaluate((DOM_ELEMENTS) => {
      return $(DOM_ELEMENTS.EVERPORT_TERMINAL[3])
        .find(DOM_ELEMENTS.EVERPORT_TERMINAL[4])
        .map(function () {
          return $(this).text().trim().replaceAll(/\t|\n/g, " ");
        })
        .get();
    }, DOM_ELEMENTS);

    if (table1.includes(nowDate)) {
      ourData.push(...table1);
    } else {
      ourData.push(...table2);
    }

    const firstShiftIndex = ourData.indexOf("1st Shift");
    const secondShiftIndex = ourData.indexOf("2nd Shift");

    const dayAndDate = ourData.slice(0, firstShiftIndex);
    const firstShift = ourData.slice(firstShiftIndex, secondShiftIndex);
    const secondShift = ourData.slice(secondShiftIndex);

    const gateHours = firstShift
      .slice(1)
      .filter(Boolean)
      .map((item, index) => {
        return {
          day: dayAndDate[index + 1],
          shift1: "07:00 - 16:00",
          shift2: "18:00 - 02:00",
          status1: item === "CLOSED" ? "CLOSED" : "OPEN",
          status2: secondShift[index + 1] === "CLOSED" ? "CLOSED" : "OPEN",
        };
      });

    await browser.close();
    const response = {
      gateHours,
    };
    return response;
  } catch (error) {
    await browser.close();
    handleError(error);
    return errorMessage("FAILEDSCRAPE");
  }
};

module.exports = EVERPORT_TERMINAL;
