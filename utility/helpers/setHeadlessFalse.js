const randomUseragent = require("random-useragent");

const fakeUserAgent = randomUseragent.getRandomData();
const setHeadlessFalse = async (page) => {
  return await page.evaluateOnNewDocument(() => {
    Object.defineProperty(navigator, "platform", { get: () => fakeUserAgent.platform });
    Object.defineProperty(navigator, "productSub", { get: () => "20100101" });
    Object.defineProperty(navigator, "vendor", { get: () => fakeUserAgent.vendor });
    Object.defineProperty(navigator, "oscpu", {
      get: () =>
        `${fakeUserAgent.osName} ${fakeUserAgent.osVersion}; ${fakeUserAgent.cpuArchitecture}`,
    });
  });
};
const setUserAgent = async (page) => {
  return await page.setUserAgent(fakeUserAgent.userAgent);
};

module.exports = { setHeadlessFalse, setUserAgent };
