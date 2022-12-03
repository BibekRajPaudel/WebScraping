const utility = require("../utility");
const payloads = require("../requestPayload");
const DOM_ELEMENTS = require("../DOM");
const {
  handleError,
  errorMessage,
} = require("../utility/helpers/errorHandling");
const moment = require("moment");
const { laTimeZone } = require("../constant");
require("moment-timezone");

const FENIX = async () => {
  const browser = await utility.browser();
  let ourData = [];

  const nowDate = moment().tz(laTimeZone).format("M/DD");

  try {
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(0);

    await page.goto(payloads["FENIX"][2], { waitUntil: "networkidle0" });
    await page.addScriptTag({ url: payloads["FENIX"][1] });

    let dataArray = await page.evaluate((DOM_ELEMENTS) => {
      return $(DOM_ELEMENTS.FENIX[0])
        .find(DOM_ELEMENTS.FENIX[1])
        .map(function () {
          return $(this).text();
        })
        .toArray();
    }, DOM_ELEMENTS);

    const mondayIndex = dataArray.indexOf("MON");
    const lastmondayindex = dataArray.indexOf("MON", mondayIndex + 1);

    const table1 = dataArray
      .slice(mondayIndex, lastmondayindex)
      .filter(Boolean);
    const table2 = dataArray
      .slice(lastmondayindex - 1, dataArray.length)
      .filter(Boolean);

      console.log(table2, "table2")

    if (table1.includes(nowDate)) {
      ourData.push(...table1);
    } else {
      ourData.push(...table2);
    }

    console.log(ourData, "ourData")
    const dayIndex = ourData.indexOf("Day");

    const table3 = ourData.splice(dayIndex, ourData.length).filter(Boolean);
    console.log(table3, "table3")

    const nightIndex = table3.indexOf("Night");
    const daysIndex = table3.indexOf("Day");
    const table4 = table3.splice(daysIndex, nightIndex).filter(Boolean);
    console.log(table4, "table4")

    const gateHours = table4
      .slice(1)
      .filter(Boolean)
      .map((item, index) => {
        return {
          day: ourData[index ],
          shift1: "07:00-16:45",
          shift2: "17:00-03:00",
          status1: item,
          status2: table3[index + 1],
        };
      });

      console.log(gateHours, "gateHours")
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

FENIX()
module.exports = FENIX;
