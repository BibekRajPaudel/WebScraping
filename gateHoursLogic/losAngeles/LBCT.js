const utility = require("../../utility");
const {
  handleError,
  errorMessage,
} = require("../../utility/helpers/errorHandling");
const payloads = require("../requestPayload");
const DOM_ELEMENTS = require("../DOM");

const { splitTime } = require("../utils");

const LBCT = async () => {
  //running the browser instance
const browser = await utility.browser()
let shiftArray = []

try {

  const page = await browser.newPage()
  page.setDefaultNavigationTimeout(0)
  await page.goto(payloads["LBCT"][0])

  const dataArray = await page.evaluate((DOM_ELEMENTS)=>{
    return $(DOM_ELEMENTS.LBCT[0])
    .find(DOM_ELEMENTS.LBCT[1])
    .map (function () {
      return $(this).text().trim()
    })
    .get()
  }, DOM_ELEMENTS)

  const shiftIndex = dataArray.findIndex((f) =>
  f.includes("Hours of Operation")
);

const firstShift = dataArray.slice(shiftIndex+1, shiftIndex + 2)
const secondShift = dataArray.slice(shiftIndex+2, shiftIndex+3)
const dayIndex = dataArray.findIndex((f) => 
  f.includes("Monday")
)
const finalArray = dataArray.slice(dayIndex, dataArray.length)


for(i=0; i<finalArray.length; i++){
shiftArray.push({
  day:finalArray[i],
  shift1: splitTime(firstShift[0]),
  shift2: splitTime(secondShift[0]),
  status1:finalArray[i+1],
  status2:finalArray[i+2]
} 
)
i=i+3
}
await browser.close()
return {
  gateHours:shiftArray
}

} catch (error) {
  await browser.close()
  handleError(error)
  return errorMessage("FAILEDSCRAPE")
}

}

module.exports = LBCT