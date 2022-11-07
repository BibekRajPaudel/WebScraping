const utility = require("../../utility");
const {
  handleError,
  errorMessage,
} = require("../../utility/helpers/errorHandling");
const payloads = require("../requestPayload");
const DOM = require("../DOM");
const moment = require("moment");
const { laTimeZone } = require("../constant");
const { splitTime } = require("../utils");
require("moment-timezone");

const PIER_A = async () => {
  const browser = await utility.browser();
  let finalArray = [];
  let shiftArray = [];

  const nowDate = moment().tz(laTimeZone).format("MMM-D");

  try {
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(0);
    await page.goto(payloads["PIER_A"][0]);

    // Login
    await page.waitForSelector(DOM.PIER_A[0]);
    await page.type(DOM.PIER_A[1], "laharbordispatch@dependableinc.com", {
      delay: 10,
    });
    await page.type(DOM.PIER_A[2], "dhe0350", {
      delay: 10,
    });
    await page.click(DOM.PIER_A[3]);
    await page.waitForTimeout(3000);

    // if invalid credentials
    let failedLogin = await page
      .evaluate((DOM) => {
        const final = !!document.querySelector(DOM.PIER_A[4]);
        return final;
      }, DOM)
      .catch((err) => {
        throw err;
      });

    if (failedLogin) {
      await browser.close();
      return "Invalid Credentials";
    }

    await page.click(DOM.PIER_A[5]);

    // Get Date Info
    const dateArray = await page.evaluate((DOM) => {
      return $(DOM.PIER_A[6])
        .map(function () {
          return $(this)
            .find(DOM.PIER_A[7])
            .map(function () {
              return $(this)
                .find(DOM.PIER_A[8])
                .map(function () {
                  return $(this).text().trim();
                })
                .get();
            })
            .get();
        })
        .get();
    }, DOM);

    for (let i = 0; i < dateArray.length; i++) {
      const element = dateArray.slice(i, i + 32);
      finalArray.push(element);
      i = i + 31;
    }

    finalArray.map((item) => {
      if (item.includes(nowDate)) {
        const valueArray = item;
        valueArray.splice(0, 8);
        const dayArray = valueArray.splice(0, 8);
        let headerLength = dayArray.length;
        dayArray.slice(1).forEach((text, index) => {
          shiftArray.push({
            day: text,
            shift1: splitTime(valueArray[0]),
            shift2: splitTime(valueArray[8]),
            status1: valueArray[index + 1],
            status2: valueArray[index + headerLength + 1],
          });
        });
      }
    });
    await browser.close();

    const response = {
      gateHours: shiftArray,
    };
    return response;
  } catch (error) {
    await browser.close();
    handleError(error);
    return errorMessage("FAILEDSCRAPE");
  }
};

module.exports = PIER_A;
