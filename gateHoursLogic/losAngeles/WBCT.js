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

const WBCT = async () => {
  const browser = await utility.browser();
  let tempArray = [];
  let finalArray = [];
  let loop = false;
  let shiftArray = [];

  const nowDate = moment().tz(laTimeZone).format("dddd, MMMM D, YYYY");

  try {
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(0);
    await page.goto(payloads["WBCT"][1], { waitUntil: "networkidle0" });
    await page.waitForTimeout(3000);

    let receivingHead = await page.evaluate((DOM_ELEMENTS) => {
      return $(DOM_ELEMENTS.WBCT[0])
        .find(DOM_ELEMENTS.WBCT[1])
        .map(function () {
          return $(this)
            .find(DOM_ELEMENTS.WBCT[2])
            .map(function () {
              return $(this).text().trim();
            })
            .get();
        })
        .get();
    }, DOM_ELEMENTS);

    receivingHead.map((text, index) => {
      if (text.startsWith("Monday")) {
        loop = true;
        tempArray.push(text);
      } else if (text.startsWith("Sunday")) {
        loop = false;
        const otherText = [...Array(3).keys()].map(
          (n) => receivingHead[index + n]
        );
        tempArray.push(...otherText);

        finalArray.push(tempArray);
        tempArray = [];
      } else if (loop) {
        tempArray.push(text);
      }
    });

    finalArray.map((item) => {
      if (item.includes(nowDate)) {
        for (let i = 0; i < item.length; i++) {
          shiftArray.push({
            day: item[i].split(",")[0],
            shift1: "07:00-17:00",
            shift2: "17:00-03:00",
            status1: item[i + 1],
            status2: item[i + 2],
          });
          i = i + 2;
        }
      }
    });
    await browser.close();
    return {
      gateHours: shiftArray,
    };
  } catch (e) {
    await browser.close();
    handleError(e);
    return errorMessage("FAILEDSCRAPE");
  }
};

module.exports = WBCT;
