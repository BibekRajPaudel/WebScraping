const getResponseValues = (values) => {
  var responseData = { container: {}, extraTracerData: {} };

  responseData.container.caution = values.caution;
  if (values.caution || values.failed) {
    return false;
  } else {
    if (values.containerNo) {
      responseData.container.containerNo = values.containerNo;
    }

    if (values.hasOwnProperty("brokerHold")) {
      responseData.container.brokerHold = values.brokerHold;
    }

    //  lfd, status, freight, custom
    if (values.s3url) {
      responseData.container.s3url = values.s3url;
    }
    if (values.custom) {
      responseData.container.custom = values.custom;
    }
    if (values.freight) {
      responseData.container.freight = values.freight;
    }
    if (values.status) {
      responseData.container.status = values.status;
    }

    if (values.last_free_day) {
      responseData.container.last_free_day = values.last_free_day;
    }
    if (values.lastFreeDay) {
      responseData.container.last_free_day = values.lastFreeDay;
    }

    if (values.eta) {
      responseData.container.eta = values.eta;
    }
    if (values.containerOwnerName) {
      responseData.container.containerOwnerName = values.containerOwnerName;
    }

    if (values.size) {
      responseData.container.containerSizeName = values.size;
    }

    if (values.type) {
      responseData.container.containerTypeName = values.type;
    }
    if (values.lineLfd) {
      responseData.container.lineLfd = values.lineLfd;
    }
    if (values.portLfd) {
      responseData.container.portLfd = values.portLfd;
    }
    if (values.billOfLading) {
      responseData.container.billOfLading = values.billOfLading;
    }

    if (values.vesselName) {
      responseData.container.vesselName = values.vesselName;
    }
    if (values.vesselCode) {
      responseData.container.vesselCode = values.vesselCode;
    }
    if (values.voyageName) {
      responseData.container.voyageName = values.voyageName;
    }
    // End of lfd, status, freight, custom

    // for Bnsf
    if (values.scac) {
      responseData.container.scac = values.scac;
    }
    if (values.chassisNo) {
      responseData.container.chassisNo = values.chassisNo;
    }

    //dischargeDate, pickedUpDate
    if (values.dischargeDate) {
      responseData.container.dischargeDate = values.dischargeDate;
    }
    if (values.pickedUpDate) {
      responseData.container.pickedUpDate = values.pickedUpDate;
    }
    if (values.changedPort) {
      responseData.container.changedPort = values.changedPort;
    }

    //

    // Extra Data
    if (values.scac) {
      responseData.extraTracerData.scac = values.scac;
    }
    if (values.chassisNo) {
      responseData.extraTracerData.chassisNo = values.chassisNo;
    }

    if (values.outgate) {
      responseData.container.outgate = values.outgate;
    }
    if (values.outGate) {
      responseData.container.outGate = values.outGate;
    }
    if (values.inGate) {
      responseData.container.inGate = values.inGate;
    }
    if (values.billingNbr) {
      responseData.extraTracerData.callerbillLandingNo = values.billingNbr;
    }

    if (values.consigneeName) {
      responseData.extraTracerData.consigneeName = values.consigneeName;
    }
    if (values.totalWeight) {
      responseData.extraTracerData.totalWeight = values.totalWeight;
    }

    if (values.weight) {
      responseData.extraTracerData.weight = values.weight;
    }

    if (values.distance) {
      responseData.extraTracerData.distance = values.distance;
    }

    if (values.height) {
      responseData.extraTracerData.containerHeightName = values.height;
    }
    if (values.vesselStatus) {
      responseData.extraTracerData.vesselStatus = values.vesselStatus;
    }

    if (values.vesselEta) {
      responseData.extraTracerData.eta = values.vesselEta;
    }

    if (values.scac) {
      responseData.extraTracerData.scac = values.scac;
    }

    if (values.temperature) {
      responseData.extraTracerData.temperature = values.temperature;
    }

    if (values.hazmat) {
      responseData.extraTracerData.hazmat = values.hazmat;
    }
    if (values.liquor) {
      responseData.extraTracerData.liquor = values.liquor;
    }
    if (values.voyage) {
      responseData.extraTracerData.releaseNo = values.voyage;
    }

    if (values.appointmentNo) {
      responseData.extraTracerData.appointmentNo = values.appointmentNo;
    }

    if (values.notes) {
      responseData.extraTracerData.notes = values.notes;
    }
    if (values.carrier) {
      responseData.extraTracerData.carrierName = values.carrier;
    }
    if (values.carrierHold) {
      responseData.extraTracerData.carrierHold = values.carrierHold;
    }

    if (values.containerAvailableDay) {
      responseData.extraTracerData.containerAvailableDay =
        values.containerAvailableDay;
    }
    if (values.sealNo) {
      responseData.extraTracerData.sealNo = values.sealNo;
    }

    if (values.shipperName) {
      responseData.extraTracerData.shipperName = values.shipperName;
    }

    if (values.pickupNo) {
      responseData.extraTracerData.pickupNo = values.pickupNo;
    }
    if (values.carrierHold) {
      responseData.extraTracerData.carrierHold = values.carrierHold;
    }

    if (values.brokerHold) {
      responseData.extraTracerData.brokerHold = values.brokerHold;
    }

    if (values.info) {
      responseData.extraTracerData.notes = values.info;
    }
    if (values.billOfLading) {
      responseData.container.billOfLading = values.billOfLading;
    }
    if (values.dischargeDate) {
      responseData.container.dischargeDate = values.dischargeDate;
    }
    if (values.dateDelivered) {
      responseData.container.dateDelivered = values.dateDelivered;
    }
    if (values.outGateDate) {
      responseData.container.outGateDate = values.outGateDate;
    }
    if (values.grossWeight) {
      responseData.container.grossWeight = values.grossWeight;
    }
    if (values.seal) {
      responseData.container.seal = values.seal;
    }
    if (values.yardLocation) {
      responseData.container.yardLocation = values.yardLocation;
    }
    if (values.demurrage) {
      responseData.container.demurrage = values.demurrage;
    }
    if (values.availableDate) {
      responseData.container.availableDate = values.availableDate;
    }
    if (values.outGatedLocation) {
      responseData.container.outGatedLocation = values.outGatedLocation;
    }
    if (values.extraTracerData) {
      responseData.extraTracerData = {
        ...responseData.extraTracerData,
        ...values.extraTracerData,
      };
    }
  }
  return responseData;
};

module.exports = getResponseValues;
