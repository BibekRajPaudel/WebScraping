const puppeteer = require("puppeteer");

const browser = async (options = {}) => {
  const browserSetting = await puppeteer.launch({
    args: [
      "--no-sandbox",
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--disable-extensions",
      "--disable-web-security",
      "--disable-features=IsolateOrigins",
      "--disable-site-isolation-trials",
    ],
    headless: false,
    ...options,
  });
  return browserSetting;
};

module.exports = browser;
