const formUrlEncoded = require("../helpers/formUrlEncoded");
const moment = require("moment");
const apmPublicKey = require('../constant/apmPublicKey.json')

const proxyApi="http://api.scraperapi.com?api_key=314441b033d19f1c9ec6266c1e2bd589&url="
const PNCT = (containerNo) => {
  return {
    url: `https://twpapi.pachesapeake.com/api/track/GetContainers?siteId=PNCT_NJ&key=${containerNo}&_=1641807197149`,
    method: "GET",
  };
};

const PNCT_BILLLADING = (containerNo) => {
  return {
    url: `https://twpapi.pachesapeake.com/api/track/GetBillOfLading?siteId=PNCT_NJ&key=${containerNo}&_=1647163081776`,
    method: "GET",
  };
};

const PNCT_GATEINFO = (containerNo) => {
  return {
    url: `https://twpapi.pachesapeake.com/api/track/GetEirReport?siteId=PNCT_NJ&key=${containerNo}&option=container&_=1647256535519`,
    method: "GET",
  };
};

const APM = (containerNo, terminalId, token) => {
  let cNumbers = containerNo.toString().split(",");

  let containerNos = [...cNumbers];
  containerNos = containerNos.filter((x) => x.match(/^[a-zA-Z]{4}[0-9]{7}$/));
  containerNos = containerNos.toString().replace(/\,/g, " ");
  return {
    url: `https://tops.apmterminals.com/api/TrackAndTrace/GetContainerAvailabiltyByTerm`,
    method: "post",
    data: {
      searches: [
        {
          SearchId: 1,
          SearchName: "Import Availability - by Container #",
        },
        {
          SearchId: 2,
          SearchName: "Import Availability - by BL",
        },
        {
          SearchId: 3,
          SearchName: "Booking Enquiry",
        },
        {
          SearchId: 4,
          SearchName: "Vessel Schedule",
        },
        {
          SearchId: 5,
          SearchName: "Equipment History",
        },
        {
          SearchId: 6,
          SearchName: "Gate Transaction",
        },
      ],
      BookingNum: "",
      ContainerNumber: "",
      billoflanding_nbr: null,
      ImportcontainerNum: `${containerNos}`,
      Scheduletrip: "1",
      Ship: "",
      inVoyageCall: "",
      outVoyageCall: "",
      GateBookingNumber: "",
      GateBillNumber: "",
      GateContainerNumber: "",
      GateToDate: "02/22/2022",
      GateFromDate: "02/22/2022",
      Gkey: "",
      GateContainer: "",
      GateTruckEntered: "",
      ShippingLineIdVGM: "",
      ChargeType: "V",
      vShippingLineId: "",
      viewvgm: false,
      TerminalId: `${terminalId}`,
      terminals: [
        {
          TerminalId: 3,
          TerminalName: "Elizabeth",
          CompanyName: "US107ELZ",
          TaxIdNumber: "",
          ScheduleDKCode: "ELZ",
          ContactName: "",
          ContactDesignation: "",
          Extension1: "",
          PhoneNumber1: "",
          Fax: "",
          Address1: "",
          Address2: "",
          City: "",
          Country: "United States",
          State: "",
          Zip: "",
          UserId: 269,
          Status: false,
          Terminal_UNLocode_AN: null,
          Plant: "USFA",
          GeoCode: "USNWKSL",
          SalesOrg: "US56",
          Check_Pmt_FL: false,
          Guarantee_FL: false,
          Credit_Card_FL: false,
          Credit_Reserve_FL: false,
          DropDownDisplay: false,
          ElectronicCheck_FL: false,
          UseContainerDischargeAsFA: false,
          LogoId: null,
          CodeNameLocation: "Elizabeth",
        },
        {
          TerminalId: 22,
          TerminalName: "Los Angeles",
          CompanyName: "US05LSA",
          TaxIdNumber: "",
          ScheduleDKCode: "LSA",
          ContactName: "",
          ContactDesignation: "",
          Extension1: "",
          PhoneNumber1: "",
          Fax: "",
          Address1: "",
          Address2: "",
          City: "",
          Country: "United States",
          State: "",
          Zip: "",
          UserId: 269,
          Status: false,
          Terminal_UNLocode_AN: null,
          Plant: "USFM",
          GeoCode: "USLSATM",
          SalesOrg: "US52",
          Check_Pmt_FL: false,
          Guarantee_FL: false,
          Credit_Card_FL: false,
          Credit_Reserve_FL: false,
          DropDownDisplay: false,
          ElectronicCheck_FL: false,
          UseContainerDischargeAsFA: false,
          LogoId: null,
          CodeNameLocation: "Los Angeles",
        },
        {
          TerminalId: 6,
          TerminalName: "Miami",
          CompanyName: "US93SFC",
          TaxIdNumber: "",
          ScheduleDKCode: "SFC",
          ContactName: "",
          ContactDesignation: "",
          Extension1: "",
          PhoneNumber1: "",
          Fax: "",
          Address1: "",
          Address2: "",
          City: "",
          Country: "United States",
          State: "",
          Zip: "",
          UserId: 269,
          Status: false,
          Terminal_UNLocode_AN: null,
          Plant: "USFW",
          GeoCode: "USMIATM",
          SalesOrg: "US55",
          Check_Pmt_FL: false,
          Guarantee_FL: false,
          Credit_Card_FL: false,
          Credit_Reserve_FL: false,
          DropDownDisplay: false,
          ElectronicCheck_FL: false,
          UseContainerDischargeAsFA: false,
          LogoId: null,
          CodeNameLocation: "Miami",
        },
        {
          TerminalId: 27,
          TerminalName: "Mobile",
          CompanyName: "US70MCT",
          TaxIdNumber: "",
          ScheduleDKCode: "MOB",
          ContactName: "",
          ContactDesignation: "",
          Extension1: "",
          PhoneNumber1: "",
          Fax: "",
          Address1: "",
          Address2: "",
          City: "",
          Country: "United States",
          State: "",
          Zip: "",
          UserId: 269,
          Status: false,
          Terminal_UNLocode_AN: null,
          Plant: "USFP",
          GeoCode: "USMOB",
          SalesOrg: "US54",
          Check_Pmt_FL: false,
          Guarantee_FL: false,
          Credit_Card_FL: false,
          Credit_Reserve_FL: false,
          DropDownDisplay: false,
          ElectronicCheck_FL: false,
          UseContainerDischargeAsFA: false,
          LogoId: null,
          CodeNameLocation: "Mobile",
        },
      ],
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
      Cookie:
        "port-elizabeth#lang=en; ASP.NET_SessionId=wzaqusywtaw0mganh1uqxuuc; __RequestVerificationToken=zieiXSHfEZLIeeJ17rVx7FEoD4ZGN0e1pgb7uvEu5k6ByEWTWFO2hpLAp6odI6-OuSeT2YDcH15G2oVJEvFxP-eChpdrh-7Acl0S_FHnWA81; ARRAffinity=aac07ba7dd5c68c1e84340e2ab9868de44ccb72bc55d43945b6902c6f5c7910e; _delighted_fst=1571801253560:{}; SC_ANALYTICS_GLOBAL_COOKIE=ebf21332699b44a98c426cbd564c65b2|True; _ga=GA1.2.1482067596.1571801254; _gid=GA1.2.1332303768.1571895326; _delighted_lst=1571895586643:{%22token%22:%22cr2EsqA2uOgqcU5fNu0K9hPl%22}; _Privacy=1; _gat_UA-411907-4=1; ak_bmsc=50161A8579D3D40668C8E498C482934E6011965F7C300000C68AB15D3EBFC328~plTai3YkdmH0GM2ejWcb3HCN7X5CXBRViw/+35ivGyUdBP1IZ8YvTTakxwiY+6+CeOd4bvted/oLTVnHNj4Kokkg6fqADTViJba94s2DZyY9oXahr8Q6f92vM0L9uuFWIM3KlB21ZC3ScNeBXJTHV0HFjSdXWK6RnpxyC3dulZDi8iQoxKQ6zTOobqZtvEWoGGaekIOG9puSvN7Zd0ceRDvqw2n+dPVsCMvmveCt+BW+CEIWPaejma/+3wJ1iNHsqI",
    },
  };
};
const APM1 = (containerNo, timeZone) => {
  const LA_TERMINAL_ID = {
    terminal: "c56ab48b-586f-4fd2-9a1f-06721c94f3bb",
    dataSource: "73067122-4bdb-4912-b6c7-4e3cb5777eaf",
  };
  const NY_TERMINAL_ID = {
    terminal: "cfc387ee-e47e-400a-80c5-85d4316f1af9",
    dataSource: "0214600e-9b26-46c2-badd-bd4f3a295e13",
  };
  const terminalAccess = timeZone.includes("America/New_York")
    ? NY_TERMINAL_ID
    : LA_TERMINAL_ID;

  return {
    url: `${proxyApi}https://www.apmterminals.com/apm/api/trackandtrace/import-availability`,
    method: "POST",
    headers: {
      "content-type": "application/json",
    },

    data: {
      TerminalId: terminalAccess.terminal,
      DateFormat: "MM/dd/yy",
      DatasourceId: terminalAccess.dataSource,
      Ids: containerNo,
    },
  };
};

const APM_GATE = (containerNo, terminalId, token, timeZone,r) => {
  let cNumbers = containerNo.toString().split(",");
  let GateToDate = moment().tz(timeZone).format("MM/DD/YYYY");
  let GateFromDate = moment()
    .tz(timeZone)
    .subtract(60, "days")
    .format("MM/DD/YYYY");
  let containerNos = [...cNumbers];
  containerNos = containerNos.filter((x) => x.match(/^[a-zA-Z]{4}[0-9]{7}$/));
  containerNos = containerNos.toString().replace(/\,/g, " ");
  let cookieVal=apmPublicKey['cookie1']
  if(r){
    cookieVal=apmPublicKey['cookie'+r]
  }
    
    

  return {
    url: `https://tops.apmterminals.com/api/TrackAndTrace/GetGateTransaction`,
    method: "post",
    data: {
      searches: [
        { SearchId: 1, SearchName: "Import Availability - by Container #" },
        { SearchId: 2, SearchName: "Import Availability - by BL" },
        { SearchId: 3, SearchName: "Booking Enquiry" },
        { SearchId: 4, SearchName: "Vessel Schedule" },
        { SearchId: 5, SearchName: "Equipment History" },
        { SearchId: 6, SearchName: "Gate Transaction" },
      ],
      BookingNum: "",
      ContainerNumber: "",
      billoflanding_nbr: "",
      ImportcontainerNum: "",
      Scheduletrip: "6",
      Ship: "",
      inVoyageCall: "",
      outVoyageCall: "",
      GateBookingNumber: "",
      GateBillNumber: "",
      GateContainerNumber: `${containerNos}`,
      GateToDate: GateToDate,
      GateFromDate: GateFromDate,
      Gkey: "",
      GateContainer: "",
      GateTruckEntered: "",
      ShippingLineIdVGM: "",
      ChargeType: "V",
      vShippingLineId: "",
      viewvgm: false,
      TerminalId: `${terminalId}`,
      terminals: [
        {
          TerminalId: 3,
          TerminalName: "Elizabeth",
          CompanyName: "US107ELZ",
          TaxIdNumber: "",
          ScheduleDKCode: "ELZ",
          ContactName: "",
          ContactDesignation: "",
          Extension1: "",
          PhoneNumber1: "",
          Fax: "",
          Address1: "",
          Address2: "",
          City: "",
          Country: "United States",
          State: "",
          Zip: "",
          UserId: 269,
          Status: false,
          Terminal_UNLocode_AN: null,
          Plant: "USFA",
          GeoCode: "USNWKSL",
          SalesOrg: "US56",
          Check_Pmt_FL: false,
          Guarantee_FL: false,
          Credit_Card_FL: false,
          Credit_Reserve_FL: false,
          DropDownDisplay: false,
          ElectronicCheck_FL: false,
          UseContainerDischargeAsFA: false,
          LogoId: null,
          CodeNameLocation: "Elizabeth",
        },
        {
          TerminalId: 22,
          TerminalName: "Los Angeles",
          CompanyName: "US05LSA",
          TaxIdNumber: "",
          ScheduleDKCode: "LSA",
          ContactName: "",
          ContactDesignation: "",
          Extension1: "",
          PhoneNumber1: "",
          Fax: "",
          Address1: "",
          Address2: "",
          City: "",
          Country: "United States",
          State: "",
          Zip: "",
          UserId: 269,
          Status: false,
          Terminal_UNLocode_AN: null,
          Plant: "USFM",
          GeoCode: "USLSATM",
          SalesOrg: "US52",
          Check_Pmt_FL: false,
          Guarantee_FL: false,
          Credit_Card_FL: false,
          Credit_Reserve_FL: false,
          DropDownDisplay: false,
          ElectronicCheck_FL: false,
          UseContainerDischargeAsFA: false,
          LogoId: null,
          CodeNameLocation: "Los Angeles",
        },
        {
          TerminalId: 6,
          TerminalName: "Miami",
          CompanyName: "US93SFC",
          TaxIdNumber: "",
          ScheduleDKCode: "SFC",
          ContactName: "",
          ContactDesignation: "",
          Extension1: "",
          PhoneNumber1: "",
          Fax: "",
          Address1: "",
          Address2: "",
          City: "",
          Country: "United States",
          State: "",
          Zip: "",
          UserId: 269,
          Status: false,
          Terminal_UNLocode_AN: null,
          Plant: "USFW",
          GeoCode: "USMIATM",
          SalesOrg: "US55",
          Check_Pmt_FL: false,
          Guarantee_FL: false,
          Credit_Card_FL: false,
          Credit_Reserve_FL: false,
          DropDownDisplay: false,
          ElectronicCheck_FL: false,
          UseContainerDischargeAsFA: false,
          LogoId: null,
          CodeNameLocation: "Miami",
        },
        {
          TerminalId: 27,
          TerminalName: "Mobile",
          CompanyName: "US70MCT",
          TaxIdNumber: "",
          ScheduleDKCode: "MOB",
          ContactName: "",
          ContactDesignation: "",
          Extension1: "",
          PhoneNumber1: "",
          Fax: "",
          Address1: "",
          Address2: "",
          City: "",
          Country: "United States",
          State: "",
          Zip: "",
          UserId: 269,
          Status: false,
          Terminal_UNLocode_AN: null,
          Plant: "USFP",
          GeoCode: "USMOB",
          SalesOrg: "US54",
          Check_Pmt_FL: false,
          Guarantee_FL: false,
          Credit_Card_FL: false,
          Credit_Reserve_FL: false,
          DropDownDisplay: false,
          ElectronicCheck_FL: false,
          UseContainerDischargeAsFA: false,
          LogoId: null,
          CodeNameLocation: "Mobile",
        },
      ],
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
      Cookie:cookieVal,
    },
  };
};

const APM_GATE_DETAIL = (gKey, terminalId, token, timeZone, containerNo, GateTruckEntered,r) => {
  let GateToDate = moment().tz(timeZone).format("MM/DD/YYYY");
  let GateFromDate = moment().tz(timeZone).subtract(60, "days").format("MM/DD/YYYY");
  let cookieVal=apmPublicKey['cookie1']
  if(r){
    cookieVal=apmPublicKey['cookie'+r]
  }
    
  return {
    url: `https://tops.apmterminals.com/api/TrackAndTrace/GetEIRReprintDetail`,
    method: "post",
    data: {
      searches: [
        {
          SearchId: 1,
          SearchName: "Import Availability - by Container #",
        },
        {
          SearchId: 2,
          SearchName: "Import Availability - by BL",
        },
        {
          SearchId: 3,
          SearchName: "Booking Enquiry",
        },
        {
          SearchId: 4,
          SearchName: "Vessel Schedule",
        },
        {
          SearchId: 5,
          SearchName: "Equipment History",
        },
        {
          SearchId: 6,
          SearchName: "Gate Transaction",
        },
      ],
      BookingNum: "",
      ContainerNumber: "",
      billoflanding_nbr: "",
      ImportcontainerNum: "",
      Scheduletrip: "6",
      Ship: "",
      inVoyageCall: "",
      outVoyageCall: "",
      GateBookingNumber: "",
      GateBillNumber: "",
      GateContainerNumber: containerNo,
      GateToDate: GateToDate,
      GateFromDate: GateFromDate,
      Gkey: gKey,
      GateContainer: containerNo,
      GateTruckEntered: GateTruckEntered,
      ShippingLineIdVGM: "",
      ChargeType: "V",
      vShippingLineId: "",
      viewvgm: false,
      TerminalId: terminalId,
      terminals: [
        {
          TerminalId: 3,
          TerminalName: "Elizabeth",
          CompanyName: "US107ELZ",
          TaxIdNumber: "",
          ScheduleDKCode: "ELZ",
          ContactName: "",
          ContactDesignation: "",
          Extension1: "",
          PhoneNumber1: "",
          Fax: "",
          Address1: "",
          Address2: "",
          City: "",
          Country: "United States",
          State: "",
          Zip: "",
          UserId: 269,
          Status: false,
          Terminal_UNLocode_AN: null,
          Plant: "USFA",
          GeoCode: "USNWKSL",
          SalesOrg: "US56",
          Check_Pmt_FL: false,
          Guarantee_FL: false,
          Credit_Card_FL: false,
          Credit_Reserve_FL: false,
          DropDownDisplay: false,
          ElectronicCheck_FL: false,
          UseContainerDischargeAsFA: false,
          LogoId: null,
          CodeNameLocation: "Elizabeth",
        },
        {
          TerminalId: 22,
          TerminalName: "Los Angeles",
          CompanyName: "US05LSA",
          TaxIdNumber: "",
          ScheduleDKCode: "LSA",
          ContactName: "",
          ContactDesignation: "",
          Extension1: "",
          PhoneNumber1: "",
          Fax: "",
          Address1: "",
          Address2: "",
          City: "",
          Country: "United States",
          State: "",
          Zip: "",
          UserId: 269,
          Status: false,
          Terminal_UNLocode_AN: null,
          Plant: "USFM",
          GeoCode: "USLSATM",
          SalesOrg: "US52",
          Check_Pmt_FL: false,
          Guarantee_FL: false,
          Credit_Card_FL: false,
          Credit_Reserve_FL: false,
          DropDownDisplay: false,
          ElectronicCheck_FL: false,
          UseContainerDischargeAsFA: false,
          LogoId: null,
          CodeNameLocation: "Los Angeles",
        },
        {
          TerminalId: 6,
          TerminalName: "Miami",
          CompanyName: "US93SFC",
          TaxIdNumber: "",
          ScheduleDKCode: "SFC",
          ContactName: "",
          ContactDesignation: "",
          Extension1: "",
          PhoneNumber1: "",
          Fax: "",
          Address1: "",
          Address2: "",
          City: "",
          Country: "United States",
          State: "",
          Zip: "",
          UserId: 269,
          Status: false,
          Terminal_UNLocode_AN: null,
          Plant: "USFW",
          GeoCode: "USMIATM",
          SalesOrg: "US55",
          Check_Pmt_FL: false,
          Guarantee_FL: false,
          Credit_Card_FL: false,
          Credit_Reserve_FL: false,
          DropDownDisplay: false,
          ElectronicCheck_FL: false,
          UseContainerDischargeAsFA: false,
          LogoId: null,
          CodeNameLocation: "Miami",
        },
        {
          TerminalId: 27,
          TerminalName: "Mobile",
          CompanyName: "US70MCT",
          TaxIdNumber: "",
          ScheduleDKCode: "MOB",
          ContactName: "",
          ContactDesignation: "",
          Extension1: "",
          PhoneNumber1: "",
          Fax: "",
          Address1: "",
          Address2: "",
          City: "",
          Country: "United States",
          State: "",
          Zip: "",
          UserId: 269,
          Status: false,
          Terminal_UNLocode_AN: null,
          Plant: "USFP",
          GeoCode: "USMOB",
          SalesOrg: "US54",
          Check_Pmt_FL: false,
          Guarantee_FL: false,
          Credit_Card_FL: false,
          Credit_Reserve_FL: false,
          DropDownDisplay: false,
          ElectronicCheck_FL: false,
          UseContainerDischargeAsFA: false,
          LogoId: null,
          CodeNameLocation: "Mobile",
        },
      ],
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
      Cookie:cookieVal,
    },
  };
};

const GCT_BAYONNE = (containerNo) => {
  const formUrlEncoded = (x) =>
    Object.keys(x).reduce(
      (p, c) => p + `&${c}=${encodeURIComponent(x[c])}`,
      ""
    );
  const formDataa = {
    containerSelectedIndexParam: "",
    searchId: 'BGLOB',
    searchType: "container",
    searchTextArea: containerNo,
    searchText: "",
    buttonClicked: "Search",
  };

  return {
    url: `http://12.182.255.86/GlobalTerminal/globalSearch.do`,
    method: "POST",
    // headers: {
    //   "Content-Type": "application/x-www-form-urlencoded",
    //   Accept:
    //     "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    // },
    // headers:{
    //   // "authority": "payments.gcterminals.com",
    //   "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    //   "accept-language": "en-US,en;q=0.9",
    //   "cache-control": "no-cache",
    //   "cookie": "JSESSIONID=0000nqlKjNKV39ajexjQRH7VOjY:-1; __cf_bm=hqCqG4Q.T2QX0dUcMqfiLDsPTl.PS6FKrMhqdwnt7ZA-1654623355-0-AWSXU3FxchD2FMLp/3dua4Bs/vey4q3nNzAcvqNXuoScakXwX67JnaAaTkJH0iYGzGEeaSFM9Q3xk7lvTiI9T9DfsSi9C8ckqHNDbtNsZMhT5l43MXpC0a0An2coWsyybg==",
    //   "pragma": "no-cache",
    //   "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"102\", \"Google Chrome\";v=\"102\"",
    //   "sec-ch-ua-mobile": "?0",
    //   "sec-ch-ua-platform": "\"Linux\"",
    //   "sec-fetch-dest": "document",
    //   "sec-fetch-mode": "navigate",
    //   "sec-fetch-site": "none",
    //   "sec-fetch-user": "?1",
    //   "upgrade-insecure-requests": "1",
    //   "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.61 Safari/537.36",
    //   "postman-token": "a12d109c-f554-4765-aeae-05e17515639d",
    //   "host": "payments.gcterminals.com",
    //   "accept-encoding": "gzip, deflate, br",
    //   "connection": "keep-alive",
    //   "date": "Fri, 03 Jun 2022 06:49:46 GMT",
    // "content-type": "text/html; charset=ISO-8859-1",
    // "transfer-encoding": "chunked",
    // "connection": "keep-alive",
    // "cache-control": "max-age=3600",
    // "expires": "Fri, 03 Jun 2022 07:49:13 GMT",
    // "content-language": "en-US",
    // "cf-cache-status": "DYNAMIC",
    // "expect-ct": "max-age=604800, report-uri=\"https://report-uri.cloudflare.com/cdn-cgi/beacon/expect-ct\"",
    // "report-to": "{\"endpoints\":[{\"url\":\"https:\\/\\/a.nel.cloudflare.com\\/report\\/v3?s=IjDxJ%2BJoUjkxUKTWOHb0ozsikDj0QH6OTY0ItsDhv%2Bfb19nP1JcwoGGoDXAdjK3GpUFFm%2FvWp4%2FZSDS1XBelnYchSIj%2FH8MU1oBI%2BdrZZlAPuCA6g7zbqEU0aHwV5UPnoHXMn8nHxRzWvBA%3D\"}],\"group\":\"cf-nel\",\"max_age\":604800}",
    // "nel": "{\"success_fraction\":0,\"report_to\":\"cf-nel\",\"max_age\":604800}",
    // "server": "cloudflare",
    // "cf-ray": "71567da1fc133143-LAX",
    // "content-encoding": "br",
    // "alt-svc": "h3=\":443\"; ma=86400, h3-29=\":443\"; ma=86400"
    // },
    // data: formDataa,
    data: formUrlEncoded(formDataa),
  };
};

const GCT_BAYONNE_BILLOFLADING = (containerNo) => {
  return {
    url: `https://api.paycargo.com/integrations/request?data=%7B%22ptd%22:%2203042022%22,%22container%22:%22${containerNo}%22,%22station%22:%22bayonne%22,%22code%22:%22gcterminal%22%7D&uid=1646537427866`,
    method: "GET",
    // headers: {
    //   "Content-Type": "application/x-www-form-urlencoded",
    //   Accept:
    //     "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    // },
  };
};

const TTI = (
  containerNo,
  cookieVal,
  currentDate,
  requiredDate,
  portUsername,
  portPassword
) => {
  const TTIData = {
    usrId: "",
    pTmlCd: "USLGB",
    pUsrId: `WARVALEINC`,
    pUsrPwd: "W@rvale",
    selectEntity: "UI-ARP-02_CNTR",
    entityNumber: " ",
    authKey: "10000101101000110111101001110",
  };
  const TTIgateData = {
    usrId: "",
    pTmlCd: "USLGB",
    pUsrId: `${portUsername}`,
    pUsrPwd: `${portPassword}`,
    selectEntity: "UI-ARP-02_CNTR",
    entityNumber: " ",
    authKey: "10000101101000110111101001110",
  };
  const formData = formUrlEncoded(TTIData);
  const formGateData = formUrlEncoded(TTIgateData);

  return {
    1: {
      method: "post",
      url: "https://www.ttilgb.com/appAuthAction/login.do",
      headers: {
        Accept: "application/json, text/javascript, */*",
        "Content-Type": "application/x-www-form-urlencoded",
        Origin: "https://www.ttilgb.com",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
      },
      data: formData,
    },
    2: {
      url: `https://www.ttilgb.com/uiArp02Action/searchContainerInformationListByCntrNo.do?srchTpCd=C&cntrNo=${containerNo}&acssHis=USLGB,0245APP,0346052,WCIM&authKey=10101101011000110000100110110`,
      method: "GET",
      headers: {
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "Content-Type": "text/html; charset=UTF-8",
        cookie: cookieVal,
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
      },
    },
    3: {
      url: `https://www.ttilgb.com/uiArp17Action/searchGateActivityList.do?rprtTp=3&strDt=${requiredDate}&endDt=${currentDate}&eqTpCd=12&strTm=07:00&endTm=17:00&trnsSts=123&gateMvTpCd=132456&trkCom=&ssco=AllSsco&spcn=&cntrNo=${containerNo}&chssNo=&acssHis=USLGB,0245APP,0346081:0346083:0346082,WARVALEINC&authKey=1000010000100011000101111110`,
      method: "GET",
      headers: {
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "Content-Type": "text/html; charset=UTF-8",
        cookie: cookieVal,
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
      },
    },
    4: {
      method: "post",
      url: "https://www.ttilgb.com/appAuthAction/login.do",
      headers: {
        Accept: "application/json, text/javascript, */*",
        "Content-Type": "application/x-www-form-urlencoded",
        Origin: "https://www.ttilgb.com",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
      },
      data: formGateData,
    },
  };
};

const PIER_A = (
  portUsername,
  portPassword,
  containerNo,
  type,
  cookies,
  todayDate,
  prevMonthDate,
  cont,
  time
) => {
  return {
    1: "https://piera.tideworks.com/fc-PA/default.do",
    2: {
      url: `https://piera.tideworks.com/fc-PA/import/default.do?searchBy=CTR&numbers=${containerNo}&6578706f7274=1&method=defaultSearch&d-7957256-e=${type}&scac=`,
      method: "GET",
      headers: {
        Cookie: cookies,
      },
    },
    3: {
      url: `https://piera.tideworks.com/fc-PA/gate/default.do?method=gateActivitySearch&activity=&sizetypeclass=CTR&endDate=${todayDate}&line=&6578706f7274=1&category=&equipmentNumber=${cont}&d-7957256-e=${type}&startDate=${prevMonthDate}`,
      method: "GET",
      headers: {
        Cookie: cookies,
      },
    },
    4: {
      url: `https://piera.tideworks.com/fc-PA/j_spring_security_check`,
      method: "POST",
      headers: {
        Accept: `text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9`,
        // 'User-Agent': `Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36`,
      },
      data: formUrlEncoded({
        j_username: "jadet97052@reimondo.com",
        j_password: "dhe0350",
      }),
    },
    5: {
      method: "POST",
      url: "https://piera.tideworks.com/fc-PA/j_spring_security_check",
      headers: {
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "Accept-Language": "en-US,en;q=0.9",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie:
          "JSESSIONID=7463EED443D3CD7ABE54D81A927B07FC; __utmz=152605880.1652333394.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); __utma=152605880.1899347597.1652333394.1652346095.1652700273.4; BNI_JSESSIONID=aJhuFD39VaPmhsRcyl1o1s0yU1It5Tvfdu84azA7O05VTInVDlbcTSZpXXm3kUFNOw6LkfdBem1m4Q091K3uvg==; __utmc=152605880; __utmt=1; __utmt_b=1; __utmb=152605880.19.10.1652700273",
        Origin: "https://piera.tideworks.com",
        Pragma: "no-cache",
        Referer: "https://piera.tideworks.com/fc-PA/default.do",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "same-origin",
        "Sec-Fetch-User": "?1",
        "Upgrade-Insecure-Requests": "1",
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
        "sec-ch-ua":
          '" Not A;Brand";v="99", "Chromium";v="101", "Google Chrome";v="101"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
      },
      form: {
        j_username: portUsername,
        j_password: portPassword,
      },
    },
    // https://piera.tideworks.com/fc-PA/home/default.do?method=scheduleSubmit&eta=05/23/2022
    6: {
      url: `https://piera.tideworks.com/fc-PA/home/default.do?eta=${time}&method=scheduleSubmitRefresh&6578706f7274=1&d-7957256-e=${type}`,
      method: "GET",
      headers: {
        Cookie: cookies,
      },
    },
    7: {
      url: `https://piera.tideworks.com/fc-PA/home/default.do?method=scheduleSubmit&eta=${time}`,
      method: "GET",
      headers: {
        Cookie: cookies,
      },
    },
    8: {
      method: "POST",
      url: "https://piera.tideworks.com/fc-PA/j_spring_security_check",
      headers: {
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "Accept-Language": "en-US,en;q=0.9",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie:
          "JSESSIONID=7463EED443D3CD7ABE54D81A927B07FC; __utmz=152605880.1652333394.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); __utma=152605880.1899347597.1652333394.1652346095.1652700273.4; BNI_JSESSIONID=aJhuFD39VaPmhsRcyl1o1s0yU1It5Tvfdu84azA7O05VTInVDlbcTSZpXXm3kUFNOw6LkfdBem1m4Q091K3uvg==; __utmc=152605880; __utmt=1; __utmt_b=1; __utmb=152605880.19.10.1652700273",
        Origin: "https://piera.tideworks.com",
        Pragma: "no-cache",
        Referer: "https://piera.tideworks.com/fc-PA/default.do",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "same-origin",
        "Sec-Fetch-User": "?1",
        "Upgrade-Insecure-Requests": "1",
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
        "sec-ch-ua":
          '" Not A;Brand";v="99", "Chromium";v="101", "Google Chrome";v="101"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
      },
      form: {
        j_username: "tnt.trucking01@gmail.com",
        j_password: "tntinc01",
      },
    },
  };
};

const YTI = (sessionId, terminalAccess, containerNo) => {
  let cookie = `ASP.NET_SessionId=${sessionId}; _ga=GA1.2.1443407004.1619848202; _gid=GA1.2.1236811493.1619848202; .VITTerminalAccess_ASPXAUTH=${terminalAccess}; Language=en-US`;
  return {
    1: "https://lynx.yti.com/?AspxAutoDetectCookieSupport=1",
    2: {
      method: "post",
      url: `https://lynx.yti.com/VITTerminalAccess/GetReleaseInquiryList.aspx?WhichReq=Container&ContainerNum=${containerNo}&BOLNum=&PTD=&ContainerNotification=false&Page=Import+Release+Inquiry&SearchType=Container&_=${containerNo}`,
      headers: {
        cookie,
      },
    },
    3: "https://lynx.yti.com/Pages/Imports/release-inquiry.aspx",
    4: "https://code.jquery.com/jquery-2.2.4.min.js",
  };
};

const WBCT = (containerNo) => {
  return {
    1: {
      url: `https://twpapi.pachesapeake.com/api/track/GetContainers?siteId=WBCT_LA&key=${containerNo}&_=636450354760735773`,
      method: "GET",
    },
  };
};

const LBCT = (containerNo) => {
  return {
    1: {
      url: `https://www.lbct.com/CargoSearch/GetMultiCargoSearchJson?timestamp=1641886321923&listOfSearchId=${containerNo}`,
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
    },
    2: "https://www.lbct.com/GateTransaction",
  };
};
// const ITS_TERMINAL = {
//   1: "https://tms.itslb.com/tms2/Account/Login",
//   2: "https://tms.itslb.com/tms2/Import/ContainerAvailability",
//   3: "https://code.jquery.com/jquery-2.2.4.min.js",
//   4: "https://tms.itslb.com/tms2/Equipment/ContainerEventHistory",
//   5: "https://tms.itslb.com/tms2/Gate/GateTransaction",
// };

const FENIX = (containerNo, loginToken) => {
  return {
    url: `https://fenixmarine.voyagecontrol.com/lynx/container/ids?venue=fenixmarine`,
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      authorization: loginToken,
    },
    data: {
      containerIds: containerNo,
    },
  };
};

const FENIX_DETAILS = (containerNo, loginToken) => {
  return {
    url: `https://fenixmarine.voyagecontrol.com/api/bookings_inquiry/container_tracking/?param=${containerNo}&venue=fenixmarine`,
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      authorization: loginToken,
    },
  };
};

const GCT_NY = (token, containerNo) => {
  if (containerNo) {
    return {
      url: "https://apigateway.emodal.com/datahub/container/AddContainers",
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
        "Content-Length": 185,
        Host: "apigateway.emodal.com",
        Origin: "https://porttruckpass.emodal.com",
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36",
      },
      data: {
        containerNumbers: containerNo,
        tradeType: "I",
        portCd: "",
        IsselectedallTradetypes: true,
      },
    };
  } else {
    return {
      url: `https://apigateway.emodal.com/datahub/container/accesslist`,
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
        "Content-Length": 185,
        Host: "apigateway.emodal.com",
        Origin: "https://porttruckpass.emodal.com",
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36",
      },
      data: {
        queryContinuationToken: "",
        pageSize: 100,
        Page: 0,
        conditions: [
          {
            mem: "viewtype_desc",
            include: true,
            oper: 10,
            required: true,
            vLow: "U",
            vHigh: [],
            seprator: "AND",
          },
        ],
        ordering: [],
      },
    };
  }
};

const PCT = (
  containerNo,
  type,
  cookies,
  todayDate,
  prevMonthDate,
  cont,
  time,
  portUsername,
  portPassword
) => {
  return {
    1: "https://pct.tideworks.com/fc-PCT/default.do",
    2: {
      url: `https://pct.tideworks.com/fc-PCT/import/default.do?searchBy=CTR&numbers=${containerNo}&6578706f7274=1&method=defaultSearch&d-7957256-e=${type}&scac=`,
      method: "GET",
      headers: {
        Cookie: cookies,
      },
    },
    3: {
      url: `https://pct.tideworks.com/fc-PCT/gate/default.do?method=gateActivitySearch&activity=&sizetypeclass=CTR&endDate=${todayDate}&line=&6578706f7274=1&category=&equipmentNumber=${cont}&d-7957256-e=${type}&startDate=${prevMonthDate}`,
      method: "GET",
      headers: {
        Cookie: cookies,
      },
    },
    5: {
      method: "POST",
      url: "https://pct.tideworks.com/fc-PCT/j_spring_security_check",
      headers: {
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "Accept-Language": "en-US,en;q=0.9",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie:
          "JSESSIONID=7463EED443D3CD7ABE54D81A927B07FC; __utmz=152605880.1652333394.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); __utma=152605880.1899347597.1652333394.1652346095.1652700273.4; BNI_JSESSIONID=aJhuFD39VaPmhsRcyl1o1s0yU1It5Tvfdu84azA7O05VTInVDlbcTSZpXXm3kUFNOw6LkfdBem1m4Q091K3uvg==; __utmc=152605880; __utmt=1; __utmt_b=1; __utmb=152605880.19.10.1652700273",
        Origin: "https://pct.tideworks.com",
        Pragma: "no-cache",
        Referer: "https://pct.tideworks.com/fc-PCT/default.do",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "same-origin",
        "Sec-Fetch-User": "?1",
        "Upgrade-Insecure-Requests": "1",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
        "sec-ch-ua":
          '" Not A;Brand";v="99", "Chromium";v="101", "Google Chrome";v="101"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "Windows",
      },
      form: {
        j_username: portUsername
          ? `${portUsername}`
          : "jadet97052@reimondo.com",
        j_password: portPassword ? `${portPassword}` : "h3ll0w0rld",
      },
    },
    6: {
      url: `https://pct.tideworks.com/fc-PCT/home/default.do?vesselVoyage=&eta=${time}&method=scheduleSubmitRefresh&etd=&line=&6578706f7274=1&d-7957256-e=${type}`,
      method: "GET",
      headers: {
        Cookie: cookies,
      },
    },
    7: {
      url: `https://pct.tideworks.com/fc-PCT/home/default.do?method=scheduleSubmit&eta=${time}`,
      method: "GET",
      headers: {
        Cookie: cookies,
      },
    },
  };
};

const TRAPAC = (token, containerNo) => {
  if (containerNo) {
    return {
      url: "https://datahub.visibility.emodal.com/datahub/container/AddContainers",
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
        "Content-Length": 185,
        Host: "datahub.visibility.emodal.com",
        Origin: "https://ecp2.emodal.com",
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36",
      },
      data: {
        containerNumbers: containerNo,
        tradeType: "I",
        portCd: "",
        IsselectedallTradetypes: true,
      },
    };
  } else {
    return {
      url: `https://datahub.visibility.emodal.com/datahub/container/accesslist`,
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
        "Content-Length": 185,
        Host: "datahub.visibility.emodal.com",
        Origin: " https://ecp2.emodal.com",
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36",
      },
      data: {
        queryContinuationToken: "",
        pageSize: 100,
        Page: 0,
        conditions: [
          {
            mem: "viewtype_desc",
            include: true,
            oper: 10,
            required: true,
            vLow: "U",
            vHigh: [],
            seprator: "AND",
          },
        ],
        ordering: [],
      },
    };
  }
};

const TRAPAC_OLD = (containerNo) => {
  return {
    1: `https://losangeles.trapac.com/payments/?terminal=LAX&containers=${containerNo}`,

    3: "https://code.jquery.com/jquery-2.2.4.min.js",
  };
};
// const HUSKY_TERMINAL = {
//   1: "https://tms.itslb.com/tms2/Account/Login",
//   2: "https://tms.itslb.com/tms2/Import/ContainerAvailability",
//   3: "https://code.jquery.com/jquery-2.2.4.min.js",
// };

const HUSKY_TERMINAL = (cookieVal, data) => {
  var config = {
    method: "post",
    url: "https://tms.itslb.com/tms2/Import/ContainerAvailability",
    headers: {
      authority: "tms.itslb.com",
      "cache-control": "max-age=0",
      "sec-ch-ua":
        '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "upgrade-insecure-requests": "1",
      origin: "https://tms.itslb.com",
      "content-type": "application/x-www-form-urlencoded",
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36",
      accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "sec-fetch-site": "same-origin",
      "sec-fetch-mode": "navigate",
      "sec-fetch-user": "?1",
      "sec-fetch-dest": "document",
      referer: "https://tms.itslb.com/tms2/Import/ContainerAvailability",
      "accept-language": "en-US,en;q=0.9",
      cookie: cookieVal,
    },
    data: data,
  };
  return config;
};

const EVERPORT_TERMINAL = (url, cookieVal, data) => {
  var config = {
    method: "post",
    url: url,
    headers: {
      Connection: "keep-alive",
      Pragma: "no-cache",
      "Cache-Control": "no-cache",
      "sec-ch-ua":
        '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "X-Requested-With": "XMLHttpRequest",
      "sec-ch-ua-mobile": "?0",
      "User-Agent":
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36",
      "sec-ch-ua-platform": '"Linux"',
      Accept: "*/*",
      Origin: "https://www.etslink.com",
      "Sec-Fetch-Site": "same-origin",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Dest": "empty",
      Referer:
        "https://www.etslink.com/wimp/p003/WIMPP003.html?_dc=1646294314466",
      "Accept-Language": "en-US,en;q=0.9",
      Cookie: cookieVal,
    },
    data: data,
  };

  return config;
  // 1: "https://www.etslink.com/",
  // 2: "https://www.etslink.com/wimp/p003/WIMPP003.html?",
  // 3: "data/WIMPP003.queryByCntr.data.json?_dc=",
};

const ITS_TERMINAL = (cookieVal, data) => {
  var config = {
    method: "post",
    url: "https://tms.itslb.com/tms2/Import/ContainerAvailability",
    headers: {
      authority: "tms.itslb.com",
      pragma: "no-cache",
      "cache-control": "no-cache",
      "sec-ch-ua":
        '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Linux"',
      "upgrade-insecure-requests": "1",
      origin: "https://tms.itslb.com",
      "content-type": "application/x-www-form-urlencoded",
      "user-agent":
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36",
      accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "sec-fetch-site": "same-origin",
      "sec-fetch-mode": "navigate",
      "sec-fetch-user": "?1",
      "sec-fetch-dest": "document",
      referer: "https://tms.itslb.com/tms2/Import/ContainerAvailability",
      "accept-language": "en-US,en;q=0.9",
      cookie: cookieVal,
    },
    data: data,
  };
  return config;
};

const YTI_SIZETYPE = (token, containerNo) => {
  if (containerNo) {
    return {
      url: "https://apigateway.emodal.com/datahub/container/AddContainers",
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
        "Content-Length": 185,
        Host: "apigateway.emodal.com",
        Origin: "https://ecp2.emodal.com/",
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36",
      },
      data: {
        containerNumbers: containerNo,
        tradeType: "I",
        portCd: "",
        IsselectedallTradetypes: true,
      },
    };
  } else {
    return {
      url: `https://apigateway.emodal.com/datahub/container/accesslist`,
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
        "Content-Length": 185,
        Host: "apigateway.emodal.com",
        Origin: "https://ecp2.emodal.com/",
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36",
      },
      data: {
        queryContinuationToken: "",
        pageSize: 100,
        Page: 0,
        conditions: [
          {
            mem: "viewtype_desc",
            include: true,
            oper: 10,
            required: true,
            vLow: "U",
            vHigh: [],
            seprator: "AND",
          },
        ],
        ordering: [],
      },
    };
  }
};

module.exports = {
  PNCT,
  APM,
  APM_GATE,
  APM_GATE_DETAIL,
  GCT_BAYONNE,
  GCT_BAYONNE_BILLOFLADING,
  PNCT_BILLLADING,
  PNCT_GATEINFO,
  TTI,
  PIER_A,
  YTI,
  WBCT,
  LBCT,
  ITS_TERMINAL,
  FENIX,
  GCT_NY,
  PCT,
  TRAPAC,
  HUSKY_TERMINAL,
  EVERPORT_TERMINAL,
  FENIX_DETAILS,
  YTI_SIZETYPE,
  TRAPAC_OLD,
};
