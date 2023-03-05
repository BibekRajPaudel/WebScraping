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
    //For jquery
    await page.addScriptTag({ url: payloads["FENIX"][1] });

    let dataArray = await page.evaluate((DOM_ELEMENTS)=>{
      return $(DOM_ELEMENTS.FENIX[0])
      .find(DOM_ELEMENTS.FENIX[1])
      .map (function() {
        return $(this).text().trim()
      }
      )
      .get()
    },DOM_ELEMENTS)

    const mondayIndex = dataArray.indexOf("MON")
    const secondlastmondayindex = dataArray.indexOf("MON", mondayIndex+1)
    const lastmondayindex = dataArray.indexOf("MON", secondlastmondayindex+1)

    const table1 = dataArray.slice(mondayIndex, secondlastmondayindex).filter(Boolean)
    const table2 = dataArray.slice(secondlastmondayindex, lastmondayindex).filter(Boolean)
    const table3 = dataArray.slice(lastmondayindex, dataArray.length)

    if (table1.includes(nowDate)) {
      ourData.push(...table1)
    } else if (table2.includes(nowDate)){
      ourData.push(...table2)
    }else {
      ourData.push(...table3)
    }
   
   const nightIndex = ourData.indexOf("Night")
   const daysIndex = ourData.indexOf("Day")

   const dayTable = ourData.slice(daysIndex, nightIndex).filter(Boolean)
   const nightTable = ourData.slice(nightIndex, ourData.length).filter(Boolean)

   const gateHours = dayTable.slice(1).map((data, index)=> {
    return {
      day:ourData[index],
      shift1:"07:00-16:45",
      shift2:"17:00-03:00",
      status1:data,
      status2:nightTable[index+1]

    }
   })
   console.log(gateHours, "gateHours")
  
   await browser.close()
   const response = {
    gateHours
   }
    
  } catch (error) {
    await browser.close();
    handleError(error);
    return errorMessage("FAILEDSCRAPE");
  }
};
FENIX()
module.exports = FENIX;
