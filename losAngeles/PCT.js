const utility = require("../utility");
const {
  handleError,
  errorMessage,
} = require("../utility/helpers/errorHandling");
const payloads = require("../requestPayload");
const DOM = require("../DOM");
const moment = require("moment");
const { laTimeZone } = require("../constant");
const { splitTime } = require("../utils");
const { get } = require("request");
require("moment-timezone");

const PCT = async () => {
  const browser = await utility.browser();
  let finalArray = [];
  const shiftArray = [];

  const nowDate = moment().tz(laTimeZone).format("MMM-D");

  try {
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(0);
    await page.goto(payloads["PCT"][0]);

    // Login
    await page.waitForSelector(DOM.PCT[0]);
    await page.type(DOM.PCT[1], "laharbordispatch@godependable.com", {
      delay: 10,
    });
    await page.type(DOM.PCT[2], "dhe0350", {
      delay: 10,
    });
    await page.click(DOM.PCT[3]);
    await page.waitForTimeout(3000);

    // if invalid credentials
    let failedLogin = await page
      .evaluate((DOM) => {
        const final = !!document.querySelector(DOM.PCT[4]);
        return final;
      }, DOM)
      .catch((err) => {
        throw err;
      });

    if (failedLogin) {
      await browser.close();
      return "Invalid Credentials";
    }

    await page.click(DOM.PCT[5]);

    // Get Date Info
    const dateArray = await page.evaluate((DOM) => {
      return $("body > div.container > div > div.col-sm-9 > table> tbody ")
        .find("tr > td")
        .map(function () {
          return $(this).text().trim();
        })
        .get();
    }, DOM);
    console.log(dateArray, "dateArray");

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

PCT()
module.exports = PCT;
