const cheerio = require("cheerio");
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

const YTI = async () => {
  const browser = await utility.browser();
  let loopTable = false;
  const finalArray = [];
  const typesIndex = [];
  let gateHours;

  const nowDate = moment().tz(laTimeZone).format("ddd, MMM D");

  try {
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(0);
    await page.goto(payloads["YTI"][0], {
      waitUntil: "networkidle0",
    });
    await page.waitForTimeout(2000);
    const elementHandle = await page.$(DOM_ELEMENTS.YTI[0]);
    const frame = await elementHandle.contentFrame();
    const content = await frame.content();
    await page.goto(frame.url());
    $ = cheerio.load(content);

    dateArray = $(DOM_ELEMENTS.YTI[1])
      .find(DOM_ELEMENTS.YTI[2])
      .map(function () {
        return $(this)
          .find(DOM_ELEMENTS.YTI[3])
          .map(function () {
            if ($(this).text().trim().includes(DOM_ELEMENTS.YTI[4])) {
              loopTable = true;
            } else if ($(this).text().trim().includes(DOM_ELEMENTS.YTI[5])) {
              loopTable = false;
            } else if (loopTable && $(this).text().trim() !== "") {
              return $(this).text().trim();
            }
          })
          .get();
      })
      .get();

    dateArray.map((item, index) => {
      if (item.includes("Mon")) {
        typesIndex.push(index);
      }
    });
    typesIndex.map((i, index) => {
      const table = dateArray.slice(i, typesIndex[index + 1]);
      finalArray.push(table);
    });

    finalArray.map((item, index) => {
      if (item.includes(nowDate)) {
        const firstShiftIndex = item.indexOf("1st");
        const secondShiftIndex = item.indexOf("2nd");
        const headerValue = item.slice(0, firstShiftIndex);
        const firstShift = item.slice(firstShiftIndex + 1, secondShiftIndex);
        const secondShift = item.slice(secondShiftIndex + 1, item.length);

        gateHours = headerValue.map((text, index) => {
          return {
            day: text.split(",")[0],
            shift1: "07:00-16:45",
            shift2: "17:00-03:00",
            status1: firstShift[index],
            status2: secondShift[index],
          };
        });
      }
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
module.exports = YTI;
