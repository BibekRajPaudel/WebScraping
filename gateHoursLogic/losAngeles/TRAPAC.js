const utility = require("../../utility");
const {
  handleError,
  errorMessage,
} = require("../../utility/helpers/errorHandling");
const DOM_ELEMENT = require("../DOM");
const payloads = require("../requestPayload");
const { staticDay } = require("../constant");

const TRAPAC = async () => {
  const browser = await utility.browser();

  let daysIndex = [];
  let startIndex = [];
  try {
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(0);
    await page.goto(payloads["TRAPAC"][0], { waitUntil: "networkidle0" });

    // date & time
    await page.addScriptTag({ url: payloads["TRAPAC"][1] });

    const dateArray = await page.evaluate((DOM_ELEMENT) => {
      return $("body > div.content > div > main > div > div > div")
        .find("h6,div.time-span")
        .map(function () {
          return $(this)
            .text()
            .trim()
            .replaceAll(/\t|\n/g, " ")
            .replaceAll(/\s+/g, " ");
        })
        .get();
    }, DOM_ELEMENT);

    // getting days index from the array
    staticDay.map((data) => {
      const findDayIndex = dateArray.findIndex((data2) => data2.includes(data));
      daysIndex.push({
        day: data,
        startIndex: findDayIndex,
      });
    });


   //Sorting and mapping the days in order
   const gateHours = daysIndex
   .sort((a, b) => a.startIndex - b.startIndex)
   .map((item, index) => {
     // extracting each day data from the array with slice
     const dayData = dateArray.slice(
       item.startIndex,
       daysIndex[index + 1]?.startIndex
     );

     let cnt = 0;
     let obj = {};
     // mapping each day and extracting time and status
     dayData.slice(1).map((data) => {
       // extract status
       const extractStatus = data.split(" ").slice(4).join(" ")
       // extract time
       const timeMatch = data.match(/(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]/g);
       if (timeMatch !== null && timeMatch?.length) {
         cnt = cnt + 1;
         const shiftObject = {
           [`shift${cnt}`]: `${timeMatch[0]} - ${timeMatch[1]}`,
           [`status${cnt}`]: extractStatus,
         };
         // create an object and store that value
         obj = Object.assign(obj, shiftObject);
         return obj;
       }
     });
     // return the whole data
     return {
       day: item.day,
       ...obj,
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

module.exports = TRAPAC;
