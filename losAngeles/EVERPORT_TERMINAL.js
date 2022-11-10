const utility = require("../../utility");
const payloads = require("../requestPayload");
const DOM = require("../DOM");
const { weekDay } = require("../constant");
const {
  handleError,
  errorMessage,
} = require("../../utility/helpers/errorHandling");

const APM_TERMINAL = async () => {
  const browser = await utility.browser();
  let loop = false;
  let rawText = [];
  let tempArr = [];
  const shiftArray = [];
  const defaultShift = {};

  try {
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(0);
    await page.goto(payloads["APM_TERMINAL"][0]);

    const rawData = await page.evaluate(
      (DOM, loop, tempArr, rawText) => {
        return $(DOM.APM[0])
          .find(DOM.APM[1])
          .map(function () {
            const text = $(this).text().trim().toUpperCase();
            if (text === DOM.APM[2]) {
              loop = true;
            } else if (text.includes(DOM.APM[3])) {
              loop = false;
            } else if (loop) {
              return $(this).text().trim();
            }
          })
          .get();
      },
      DOM,
      loop,
      tempArr,
      rawText
    );

    rawData.map((text, index) => {
      if (text.includes("day") && !text.includes("CLOSED") && tempArr.length) {
        rawText.push(tempArr);
        tempArr = [];
      } else if (rawData.length - 1 == index) {
        rawText.push(tempArr);
      }
      tempArr.push(text);
    });

    rawText.map((raw) => {
      const day = raw
        .slice(0, 1)
        .toString()
        .split(" ")
        .filter((fil) => fil.includes("day"));

      const firstShift = raw[1].match(/(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]/g);
      const secondShift = raw[2].match(/(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]/g);
      if (firstShift?.length) {
        defaultShift.shift1 = `${firstShift[0]} - ${firstShift[1]}`;
        defaultShift.shift2 = `${secondShift[0]} - ${secondShift[1]}`;
      }
      if (raw[1].includes("day")) {
        const value1 = raw[1].split(",");
        const value2 = raw[2].split(",");
        const firstStatus =
          value1[0].includes("OPEN") || value1[0]?.includes("Full")
            ? "OPEN"
            : "CLOSED";
        const secondStatus =
          value1[1].includes("OPEN") || value1[1]?.includes("Full")
            ? "OPEN"
            : "CLOSED";
        const thirdStatus =
          value2[0].includes("OPEN") || value2[1]?.includes("Full")
            ? "OPEN"
            : "CLOSED";
        shiftArray.push(
          {
            day: day[0]?.toUpperCase(),
            shift1: firstShift?.length
              ? `${firstShift[0]} - ${firstShift[1]}`
              : defaultShift.shift1,
            shift2: secondShift?.length
              ? `${secondShift[0]} - ${secondShift[1]}`
              : defaultShift.shift2,
            status1: firstStatus,
            status2: secondStatus,
          },
          {
            day: day[1]?.toUpperCase(),
            shift1: firstShift?.length
              ? `${firstShift[0]} - ${firstShift[1]}`
              : defaultShift.shift1,
            shift2: secondShift?.length
              ? `${secondShift[0]} - ${secondShift[1]}`
              : defaultShift.shift2,
            status1: thirdStatus,
            status2: thirdStatus,
          }
        );
      } else {
        const firstStatus =
          raw[1].includes("OPEN") || raw[1].includes("Full")
            ? "OPEN"
            : "CLOSED";
        const secondStatus =
          raw[2].includes("OPEN") || raw[2].includes("Full")
            ? "OPEN"
            : "CLOSED";
        let loopDay = false;
        if (day.length > 1) {
          weekDay.forEach((dy) => {
            if (dy.name === day[0].toUpperCase()) {
              loopDay = true;
              shiftArray.push({
                day: dy.name,
                shift1: `${firstShift[0]} - ${firstShift[1]}`,
                shift2: `${secondShift[0]} - ${secondShift[1]}`,
                status1: firstStatus,
                status2: secondStatus,
              });
            } else if (dy.name === day[1].toUpperCase()) {
              loopDay = false;
              shiftArray.push({
                day: dy.name,
                shift1: `${firstShift[0]} - ${firstShift[1]}`,
                shift2: `${secondShift[0]} - ${secondShift[1]}`,
                status1: firstStatus,
                status2: secondStatus,
              });
            } else if (loopDay) {
              shiftArray.push({
                day: dy.name,
                shift1: `${firstShift[0]} - ${firstShift[1]}`,
                shift2: `${secondShift[0]} - ${secondShift[1]}`,
                status1: firstStatus,
                status2: secondStatus,
              });
            }
          });
        } else {
          shiftArray.push({
            day: day[0]?.toUpperCase(),
            shift1: `${firstShift[0]} - ${firstShift[1]}`,
            shift2: `${secondShift[0]} - ${secondShift[1]}`,
            status1: firstStatus,
            status2: secondStatus,
          });
        }
      }
    });

    await browser.close();

    return {
      gateHours: shiftArray,
    };
  } catch (error) {
    await browser.close();
    handleError(error);
    return errorMessage("FAILEDSCRAPE");
  }
};

module.exports = APM_TERMINAL;
