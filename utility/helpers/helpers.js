let status = require("../constant/status.json");
const dataValidityChecker = require("./dataValidityChecker");

const statusHelper = function (portName, currentStatus) {
  let port = portName.replace("_", " ");
  let actualStatus = "";
  Object.keys(status).forEach((key) => {
    Object.keys(status[key]).forEach((J) => {
      if (J == port && status[key][J].indexOf(currentStatus)) {
        actualStatus = key;
      }
    });
  });
  return actualStatus;
};
const apmStatus1 = function (allData) {
  let obj = {
    status: "",
    location: "",
  };
  // ReadyForDeliveryReason = READYFORDELIVERYREASON && ReadyForDelivery = READYFORDELIVERY for old apm api
  if (
    allData.ReadyForDeliveryReason == "Container not in Yard" &&
    allData.Discharged === false
  ) {
    obj = Object.assign(
      {},
      { status: "On Vessel" },
      {
        location: allData.POSITION,
      }
    );
  } else if (allData.ReadyForDelivery == true) {
    // YES for old apm api
    obj = Object.assign(
      {},
      { status: "Available" },
      {
        location: allData.POSITION,
      }
    );
  } else if (
    allData.ReadyForDeliveryReason == "Container has impediments" ||
    allData.YardLocation?.includes("Yard Grounded")
  ) {
    obj = Object.assign(
      {},
      { status: "Not Available" },
      {
        location: allData.POSITION,
      }
    );
  } else if (
    allData.ReadyForDeliveryReason == "Container not in Yard" &&
    allData.Discharged == true
  ) {
    obj = Object.assign(
      {},
      { status: "Outgated" },
      {
        location: allData.POSITION,
      }
    );
  } else if (allData.Discharged == false) {
    obj = Object.assign(
      {},
      { status: "Not Available" },
      {
        location: allData.POSITION,
      }
    );

    // } else if (allData.PICKEDUP && allData.DISCHARGED && allData.POSITION == "COMMUNITY - OUT" && allData.TruckerAppointment && allData.TruckerGateIn && allData.TruckerGateOut) {
    //     obj = Object.assign({}, {status: "Terminated"}, {
    //         location: allData.POSITION
    //     })
  } else {
    obj = Object.assign(
      {},
      { status: "Not Found" },
      {
        location: allData.POSITION,
      }
    );
  }
  return obj;
};
const apmStatus = function (allData) {
  let obj = {
    status: "",
    location: "",
  };
  if (
    allData.READYFORDELIVERYREASON == "Container not in Yard" &&
    !allData.DISCHARGED &&
    !allData.PICKEDUP
  ) {
    obj = Object.assign(
      {},
      { status: "On Vessel" },
      {
        location: allData.POSITION,
      }
    );
  } else if (allData.READYFORDELIVERY == "YES") {
    obj = Object.assign(
      {},
      { status: "Available" },
      {
        location: allData.POSITION,
      }
    );
  } else if (
    (allData.READYFORDELIVERYREASON == "Container has impediments" ||
      allData.POSITION.includes("Yard Grounded")) &&
    allData.DISCHARGED &&
    !allData.PICKEDUP
  ) {
    obj = Object.assign(
      {},
      { status: "Not Available" },
      {
        location: allData.POSITION,
      }
    );
  } else if (
    (allData.READYFORDELIVERYREASON == "Container not in Yard" &&
    allData.PICKEDUP &&
    allData.DISCHARGED)
  ) {
    obj = Object.assign(
      {},
      { status: "Outgated" },
      {
        location: allData.POSITION,
      }
    );
  } else if (allData.DISCHARGED) {
    obj = Object.assign(
      {},
      { status: "Not Available" },
      {
        location: allData.POSITION,
      }
    );
    // } else if (allData.PICKEDUP && allData.DISCHARGED && allData.POSITION == "COMMUNITY - OUT" && allData.TruckerAppointment && allData.TruckerGateIn && allData.TruckerGateOut) {
    //     obj = Object.assign({}, {status: "Terminated"}, {
    //         location: allData.POSITION
    //     })
  } else if (
    (allData.READYFORDELIVERYREASON == "Container not in Yard" &&
    allData.PICKEDUP)
  ) {
    obj = Object.assign(
      {},
      { status: "Outgated" },
      {
        location: allData.POSITION,
      }
    );
  }else {
    obj = Object.assign(
      {},
      { status: "Not Found" },
      {
        location: allData.POSITION,
      }
    );
  }
  return obj;
};

const maherStatus = function (allData) {
  let obj = {
    status: "",
    location: "",
    outGatedLocation: "",
  };
  // console.log(allData)
  const checkHoldsArray = (val) =>
    val.code == "BNL HOLD" &&
    val.description == "Container Is Not Discharged" &&
    val.type == "TERMINAL";
  if (
    (allData.transit_state_description == "Departed" || "Inbound") &&
    allData.holdsArray &&
    allData.holdsArray.length > 0 &&
    allData.holdsArray.find(checkHoldsArray)
  ) {
    obj = Object.assign(
      {},
      { status: "On Vessel" },
      {
        location: allData.location,
      }
    );
  } else if (allData.transit_state_description == "Discharged") {
    obj = Object.assign(
      {},
      { status: "Not Available" },
      {
        location: allData.location,
      }
    );
  } else if (
    (allData.transit_state == "S60_LOADED" ||
      allData.transit_state == "S50_ECOUT" ||
      allData.transit_state_description == "Yard") &&
    allData.freight_released == "1" &&
    allData.customs_released == "1"
  ) {
    obj = Object.assign(
      {},
      { status: "Available" },
      {
        location: allData.location,
      }
    );
  } else if (
    allData.transit_state_description == "Yard" &&
    (allData.freight_released == "0" || allData.customs_released == "0")
  ) {
    obj = Object.assign(
      {},
      { status: "Not Available" },
      {
        location: allData.location,
      }
    );
    // }
    // else if (allData.transit_state_description == 'Departed' && allData.delivered_date) {
    //     obj = Object.assign({}, { status: "Outgated" }, {
    //         outGatedLocation: allData.location,
    //     })
    // } else if (allData.transit_state_description == 'Departed' && allData.delivered_date) {
    //     obj = Object.assign({}, { status: "Terminated" }, {
    //         location: allData.location
    //     })
  } else {
    obj = Object.assign(
      {},
      { status: "Not Found" },
      {
        location: allData.location,
      }
    );
  }
  return obj;
};

const everportMapper = (data) => {
  const obj = {
    "Gate Out": "Outgated",
    "On Vessel": "On Vessel",
    "Closed Area": "Not Available",
    "In Yard": "Not Available"

  }
  return obj[data]
}

const pnctStatus = function (allData) {
  let obj = {
    status: "",
    location: "",
  };
  if (allData.AvailabilityDisplayStatus?.toLowerCase()?.includes('yes')) {
    obj = Object.assign(
      {},
      { status: "Available" },
      {
        location: allData.Location,
      }
    );
  } else if (["On Ship"].indexOf(allData.State) > -1) {
    obj = Object.assign(
      {},
      { status: "On Vessel" },
      {
        location: allData.Location,
      }
    );
    // } else if (allData.ContainerState == 'Departed' && allData.MoveDateTime) {
    //     obj = Object.assign({}, {status: "Terminated"}, {
    //         location: allData.Location
    //     })
  } else if (
    allData.State == "In Yard" &&
    allData.AvailabilityDisplayStatus == "No"
  ) {
    obj = Object.assign(
      {},
      { status: "Not Available" },
      { location: allData.Location }
    );
  } else if (allData.ContainerState == "Departed") {
    obj = Object.assign(
      {},
      { status: "Outgated" },
      {
        location: allData.Location,
      }
    );
  } else if (allData.AvailabilityDisplayStatus == "Yes") {
    obj = Object.assign(
      {},
      { status: "Available" },
      {
        location: allData.Location,
      }
    );
  } else {
    obj = Object.assign(
      {},
      { status: "Not Found" },
      {
        location: allData.Location,
      }
    );
  }
  return obj;
};

const globalStatus = function (allData) {
  let obj = {
    status: "",
    location: "",
  };
  if (
    allData["Gate Out Date:"] &&
    allData["Gate Out Date:"] != "" &&
    allData["Discharge Date:"] &&
    allData["Discharge Date:"] != ""
  ) {
    obj = Object.assign({}, { status: "Outgated" });
  } else if (allData["In Yard:"] && allData["In Yard:"] == "No") {
    obj = Object.assign({}, { status: "On Vessel" });
  } else if (
    allData["Available for Pickup:"] &&
    allData["Available for Pickup:"] == "Yes"
  ) {
    obj = Object.assign({}, { status: "Available" });
  } else if (
    allData["Available for Pickup:"] &&
    allData["In Yard:"] == "Yes" &&
    allData["Available for Pickup:"] == "No" &&
    allData["Discharge Date:"] &&
    allData["Discharge Date:"] != ""
  ) {
    obj = Object.assign({}, { status: "Not Available" });
  } else if (allData["Discharge Date:"] && allData["Discharge Date:"] != "") {
    obj = Object.assign({}, { status: "Not Available" });
  } else {
    obj = Object.assign({}, { status: "Not Found" });
  }
  return obj;
};

const nyStatus = function (allData) {
  let statusOptions = {
    "IN YARD": "available",
    "READY FOR PICKUP": "available",
  };

  let obj = {
    status: "",
    location: "",
  };
  if (
    allData["drayunitstatus_desc"] &&
    (allData["drayunitstatus_desc"] == "ON VESSEL" ||
      allData["drayunitstatus_desc"] == "VESSEL ARRIVAL")
  ) {
    obj = Object.assign({}, { status: "On Vessel" });
  } else if (
    allData["drayunitstatus_desc"] &&
    statusOptions[allData["drayunitstatus_desc"]] &&
    allData["hold_flg"] == "False" &&
    allData["lastfree_dttm"] != ""
  ) {
    obj = Object.assign({}, { status: "Available" });
  } else if (
    allData["drayunitstatus_desc"] &&
    allData["drayunitstatus_desc"] == "IN YARD" &&
    allData["unload_dttm"] &&
    allData["unload_dttm"] != ""
  ) {
    obj = Object.assign({}, { status: "Not Available" });
  } else if (
    allData["drayunitstatus_desc"] &&
    allData["drayunitstatus_desc"] == "GATE OUT"
  ) {
    obj = Object.assign({}, { status: "Outgated" });
  } else if (
    allData["drayunitstatus_desc"] &&
    allData["drayunitstatus_desc"] == "GATE IN"
  ) {
    obj = Object.assign({}, { status: "Terminated" });
  }else if (allData["drayunitstatus_desc"]=== "MANIFESTED") {
    obj = Object.assign({}, { status: "On Vessel" });
  } else if (allData["hold_flg"]) {
    obj = Object.assign({}, { status: "Not Available" });
  }  else {
    obj = Object.assign(
      {},
      { status: "Not Found" },
      {
        location: allData.Location,
      }
    );
  }
  return obj;
};

const ITSStatus = function (allData) {
  let obj = {
    status: "",
    location: "",
  };
  if (
    allData["spotNum"] === "ARRIVING" &&
    allData["isContainerAvailable"] === false
  ) {
    obj = Object.assign({}, { status: "On Vessel" });
  } else if (
    allData["spotNum"] !== "ARRIVING" &&
    allData["spotNum"] !== "DELIVERED" &&
    allData["isContainerAvailable"] === true
  ) {
    obj = Object.assign({}, { status: "Available" });
  } else if (
    allData["spotNum"] !== "ARRIVING" &&
    allData["spotNum"] !== "DELIVERED" &&
    allData["isContainerAvailable"] === false
  ) {
    obj = Object.assign({}, { status: "Not Available" });
  } else if (
    allData["spotNum"] === "DELIVERED" &&
    allData["isContainerAvailable"] === false
  ) {
    obj = Object.assign({}, { status: "Outgated" });
  } else {
    obj = Object.assign({}, { status: "Not Found" });
  }
  return obj;
};

const ttiStatus = function (allData) {
  let outGateDatechecker = dataValidityChecker(
    4,
    "month",
    "MM/DD/YYYY",
    allData.lctnNm
      ?.match(/\((.*)\)/)
      ?.pop()
      ?.split(" ")[0]
  );
  let obj = {
    status: "",
    location: "",
  };
  if (allData.lctnNm == "On Ship") {
    obj = Object.assign({}, { status: "On Vessel" });
  } else if (
    outGateDatechecker &&
    allData.lctnNm.includes("Out-Gated") ||
    allData.lctnNm === "Delivered"
  ) {
    obj = Object.assign({}, { status: "Outgated" });
  } else if (
    allData.lctnNm === "In Yard(Deck)" &&
    allData.avlbFlg.includes("Yes")
  ) {
    obj = Object.assign({}, { status: "Available" });
  } else if (
    allData.lctnNm === "In Yard(Deck)" ||
    (allData.lctnNm === "SHIP/YARD" && allData.avlbFlg.includes("No"))

  ) {
    obj = Object.assign({}, { status: "Not Available" });
  } else {
    obj = Object.assign({}, { status: "Not Found" });
  }
  return obj;
};

const pierAStatus = function (allData) {
  let obj = {
    status: "",
    location: "",
  };
  // if ((allData.Activity = 'FULL OUT')) {
  //   obj = {
  //     ...obj,
  //     status: 'Outgate',
  //   };
  // }

  // ON VESSEL
  if (
    (allData.Available === "Not available for pickup" && allData.Location == 'VESSEL')
  ) {
    obj = Object.assign({}, { status: 'On Vessel' });
  }

  //AVAILABLE
  else if ((allData.Available === "Available for pickup")) {
    obj = Object.assign({}, { status: 'Available' });
  }

  //NOT AVAILABLE
  else if (
    (allData.Available === 'Not available for pickup' && allData.Location == 'YARD  (Grounded)')
  ) {
    obj = Object.assign({}, { status: 'Not Available' });
  }

  // OUTGATED
  else if (allData.Location == 'OFFDOCK') {
    obj = {
      ...obj,
      status: 'Outgated',
    };
  }
  else {
    obj = Object.assign({}, { status: 'Not Available' });
  }
  // TERMINATED

  return obj;
};
const pctStatus = function (allData) {

  let obj = {
    status: '',
    location: '',
  };
  if ((allData.Activity === 'FULL OUT')) {
    obj = {
      ...obj,
      status: 'Outgate',
    };
  }
  // ON VESSEL
  else if (
    (allData.Available ===
      'Not available for pickup' && allData.Location === 'VESSEL')
  ) {
    obj = Object.assign({}, { status: 'On Vessel' });
  }

  //AVAILABLE
  else if ((allData.Available === 'Available for pickup')) {
    obj = Object.assign({}, { status: 'Available' });
  }

  //NOT AVAILABLE
  else if (
    (allData.Available === "Not available for pickup" || allData.Available === "NOTAVAIL" && allData.Location === "YARD  (Grounded)")
  ) {
    obj = Object.assign({}, { status: 'Not Available' });
  }

  // OUTGATED
  else if (allData.Location === 'OFFDOCK') {
    obj = {
      ...obj,
      status: 'Outgated',
    };
  }
  // TERMINATED
  else {
    obj = Object.assign({}, { status: 'Not Available' });
  }
  return obj;
};
const wbctStatus = function (allData) {
  let obj = {
    status: '',
    location: '',
  };
  if (
    allData.Available === 2 &&
    allData.AvailabilityDisplayStatus?.replace(/(<([^>]+)>)/gi, '')
      .trim()
      .split(' ')[0] === 'No' &&
    allData.State === 'On Ship'
  ) {
    obj = Object.assign({}, { status: 'On Vessel' });
  } else if (
    allData.Available === 1 &&
    allData.AvailabilityDisplayStatus?.replace(/(<([^>]+)>)/gi, '')
      .trim()
      .split(' ')[0] === 'Yes' &&
    allData.State === 'In Yard'
  ) {
    obj = Object.assign({}, { status: 'Available' });
  } else if (allData.Available === 0 && allData.MoveDateTime) {
    obj = Object.assign({}, { status: 'Outgated' });
  } else if (allData.Available === 2 && allData.AvailabilityDisplayStatus?.replace(/(<([^>]+)>)/gi, '')
    .trim()
    .split(' ')[0] === 'No' &&
    allData.State === 'In Yard') {
    obj = Object.assign({}, { status: 'Not Available' });
  }
  else {
    obj = Object.assign({}, { status: 'Not Found' });
  }
  return obj;
};

const ytiStatus = function (allData) {
  let obj = {
    status: '',
    location: '',
  };
  if (
    allData.available?.toUpperCase() === 'NO' &&
    allData.position?.includes('OUT')
  ) {
    obj = Object.assign({}, { status: 'Outgated' });
  } else if (allData.available?.toUpperCase() === 'YES') {
    obj = Object.assign({}, { status: 'Available' });
  } else if (
    allData.available?.toUpperCase() === 'NO' &&
    !allData.position?.includes('OUT') &&
    allData.lfd
  ) {
    obj = Object.assign({}, { status: 'Not Available' });
  } else if (
    allData.available?.toUpperCase() === 'NO' &&
    !allData.position?.includes('OUT') &&
    !allData.lfd
  ) {
    obj = Object.assign({}, { status: 'On Vessel' });
  } else {
    obj = Object.assign({}, { status: 'Not Found' });
  }
  return obj;
};

const locationMapper = {
  'On Vessel': 'vesselLocation',
  Available: 'availableLocation',
  Outgated: 'outGatedLocation',
  Discharged: 'dischargedLocation',
  'Not Available': 'notAvailableLocation',
};

module.exports = {
  statusHelper,
  apmStatus,
  maherStatus,
  pnctStatus,
  globalStatus,
  nyStatus,
  ttiStatus,
  locationMapper,
  everportMapper,
  pierAStatus,
  pctStatus,
  ITSStatus,
  wbctStatus,
  ytiStatus,
};
