const utility = require("../../utility");
const payloads = require("../requestPayload");
const DOM_ELEMENTS = require("../DOM");
const {
  handleError,
  errorMessage,
} = require("../../utility/helpers/errorHandling");
const { staticDay } = require("../constant");
const moment = require("moment");
const { laTimeZone } = require("../constant");
require("moment-timezone");

const TTI = async () => {
  const browser = await utility.browser();
  const nowDate = moment().tz(laTimeZone).format("dddd– MMMM Do");
  const shiftArray = [];

  let daysIndex = [];
  let secondDaysIndex = [];

  try {
    const page = await browser.newPage();
    await page.goto(payloads["TTI"][0]);

    let receivingHead = await page.evaluate((DOM_ELEMENTS) => {
      return $(DOM_ELEMENTS.TTI[0])
        .find(DOM_ELEMENTS.TTI[1])
        .map(function () {
          return $(this).text().trim().replaceAll(/\t|\n/g, " ");
        })
        .get();
    }, DOM_ELEMENTS);

    let firstElement = receivingHead[0];
    let lastELement = moment(firstElement, "dddd- MMMM Do")
      .add(7, "days")
      .format("ddd");
    let lastElementIndex;
    let totalLength = receivingHead.length;
    receivingHead.map((element) => {
      if (element.toLowerCase()?.includes(lastELement?.toLocaleLowerCase())) {
        lastElementIndex = receivingHead.indexOf(element);
      }
    });

    let firstArray = receivingHead.slice(0, lastElementIndex);
    let secondArray = receivingHead.slice(lastElementIndex, totalLength);

    if (firstArray.includes(nowDate)) {
      staticDay.map((day) => {
        const findDayIndex = firstArray.findIndex((data) => data.includes(day));
        if (findDayIndex !== -1) {
          daysIndex.push({
            day,
            startIndex: findDayIndex,
          });
        }
      });

      const sort = daysIndex
        .sort((a, b) => a.startIndex - b.startIndex)
        .map((item, index) => {
          const dayData = receivingHead
            .slice(
              item.startIndex,
              daysIndex[index + 1]?.startIndex || item.startIndex + 4
            )
            .filter(Boolean);

          if (dayData.length === 4) {
            const day = dayData[0]?.split("–");
            const firstShift = dayData[1].includes("FULL") ? "OPEN" : "CLOSED";
            const secondShift = dayData[2].includes("FULL") ? "OPEN" : "CLOSED";
            const thirdShift = dayData[3].includes("DUAL") ? "OPEN" : "CLOSED";
            shiftArray.push({
              day: day[0],
              shift1: "07:00-16:59",
              shift2: "18:00-02:30",
              shift3: "03:00-06:30",
              status1: firstShift,
              status2: secondShift,
              status3: thirdShift,
            });
          } else {
            const day = dayData[0]?.split("–");

            const firstShift = dayData[1]?.includes("FULL") ? "OPEN" : "CLOSED";
            const secondShift = dayData[2]?.includes("CLOSED")
              ? "CLOSED"
              : "OPEN";
            shiftArray.push({
              day: day[0],
              shift1: "07:00-16:59",
              shift2: "18:00-02:30",
              status1: firstShift,
              status2: secondShift,
            });
          }
        });
    } else if (secondArray.includes(nowDate)) {
      staticDay.map((day) => {
        const findDayIndex = secondArray.findIndex((data) =>
          data.includes(day)
        );
        if (findDayIndex !== -1) {
          secondDaysIndex.push({
            day,
            startIndex: findDayIndex,
          });
        }
      });

      const sort = secondDaysIndex
        .sort((a, b) => a.startIndex - b.startIndex)
        .map((item, index) => {
          const dayData = secondArray
            .slice(
              item.startIndex,
              secondDaysIndex[index + 1]?.startIndex || item.startIndex + 4
            )
            .filter(Boolean);

          if (dayData.length === 4) {
            const day = dayData[0]?.split("–");

            const firstShift = dayData[1].includes("FULL") ? "OPEN" : "CLOSED";
            const secondShift = dayData[2].includes("FULL") ? "OPEN" : "CLOSED";
            const thirdShift = dayData[3].includes("DUAL") ? "OPEN" : "CLOSED";
            shiftArray.push({
              day: day[0],
              shift1: "07:00-16:59",
              shift2: "18:00-02:30",
              shift3: "03:00-06:30",
              status1: firstShift,
              status2: secondShift,
              status3: thirdShift,
            });
          } else {
            const day = dayData[0]?.split("–");

            const firstShift = dayData[1]?.includes("FULL") ? "OPEN" : "CLOSED";
            const secondShift = dayData[2]?.includes("CLOSED")
              ? "CLOSED"
              : "OPEN";
            shiftArray.push({
              day: day[0],
              shift1: "07:00-16:59",
              shift2: "18:00-02:30",
              status1: firstShift,
              status2: secondShift,
            });
          }
        });

      await browser.close();
    }

    return {
      gateHours: shiftArray,
    };
  } catch (error) {
    await browser.close();
    handleError(error);
    return errorMessage("FAILEDSCRAPE");
  }
};

module.exports = TTI;
