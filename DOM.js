const FENIX = {
  0: "div > table > tbody",
  1: "tr > td",
};

const TRAPAC = {
  0: "body > div.content > div > main > div.terminal-hours > div.terminal-days > div",
  1: "h6, div.time-span",
};

const PCT = {
  0: "#mainForm",
  1: "#j_username",
  2: "#j_password",
  3: "#signIn",
  4: ".login-failure",
  5: "#homepageAlert > div > div > div.modal-header > button > span",
  6: "body > div.container > div > div.col-sm-9 > table",
  7: "tbody > tr",
  8: "td",
};

const APM = {
  0: "#main > div:nth-child(4) > article > div > div > div.page__main > div",
  1: "h2, p, ul > li",
  2: "STANDARD OPERATING HOURS",
  3: "CLOSURES",
};

const EVERPORT_TERMINAL = {
  0: "#iconLAX",
  1: "#hours > table:nth-child(4)>tbody",
  2: "tr > td",
  3: "#LAX > div:nth-child(14)>div:nth-child(1) > table:nth-child(7)",
  4: "tbody > tr > td",
};
const PIER_A = {
  0: "#mainForm",
  1: "#j_username",
  2: "#j_password",
  3: "#signIn",
  4: ".login-failure",
  5: "#homepageAlert > div > div > div.modal-header > button > span",
  6: "body > div.container > div > div.col-sm-9 > table",
  7: "tbody > tr",
  8: "td",
};

const WBCT = {
  0: "#divPageletLayout > div:nth-child(1) > div:nth-child(1) > div.pagelet-resizable-content > div > table > tbody ",
  1: "tr",
  2: "td",
};
const YTI = {
  0: "#iframe",
  1: ".waffle",
  2: "tr",
  3: "td",
  4: "Gate Schedule",
  5: "EXPORT RECEIVING SCHEDULE",
};

const ITS_TERMINAL = {
0:"#reports > tbody",
1:"tr"
}


const LBCT = {
  0: "#TruckGateContentWrap > div:nth-child(2) > table > tbody",
  1: "tr",
  2: "td",
};

const TTI = {
  0: "body > table > tbody > tr > td > table > tbody > tr > td > table:nth-child(3) > tbody > tr > td > table:nth-child(5) > tbody",
  1: "tr > td > table > tbody>tr"
}
module.exports = {
  FENIX,
  TRAPAC,
  PCT,
  APM,
  EVERPORT_TERMINAL,
  PIER_A,
  WBCT,
  YTI,
  ITS_TERMINAL,
  LBCT,
  TTI
};
