const Fs = require("fs");
const Path = require("path");
const Util = require("util");
const puppeteer = require("puppeteer");
const Handlebars = require("handlebars");
const ReadFile = Util.promisify(Fs.readFile);
const { uploadToS3 } = require("./uploadToS3");
const { s3Payload, imageUrlPath } = require("./s3Payload");
const { httpRequest } = require(".");

const pdf = require("pdf-parse");
const uploadToS3Bucket = async (docType, port, containerNo, imageBuffer) => {
  let imagePath = {};
  let imageUrl = await imageUrlPath(
    docType,
    port,
    `${Math.ceil(Math.random() * 100000000000)}_${containerNo}`
  );
  let fileType = await s3Payload("pdf");
  let s3ObjectUrl = await uploadToS3(imageUrl, imageBuffer, fileType);
  imagePath.s3Url = s3ObjectUrl.Location;
  imagePath.containerNo = containerNo;
  imagePath.port = port;

  return imagePath;
};
module.exports = {
  async compileHtml(
    infos,
    htmlfile,
    output,
    port,
    containerNo,
    docType,
    landscape = false
  ) {
    let data = {
      result: infos,
    };

    const templatePath = Path.resolve(__dirname, "templates", htmlfile);
    const content = await ReadFile(templatePath, "utf8");

    // compile and render the template with handlebars
    const template = Handlebars.compile(content);

    if (output === "pdf") {
      let browser = null;
      let page = null;
      let pdf = null;
      try {
        const html = template(infos);

        // Puppeteer Options
        let options = {
          headless: true,
          pipe: true,
          args: ["--no-sandbox"],
        };
        // Only on apm
        if (
          process.env.NODE_ENV === "production" &&
          (port === "APM" || port === "APM_TERMINAL")
        ) {
          options.executablePath =
            "./node_modules/puppeteer/.local-chromium/linux-818858/chrome-linux/chrome";
        }
        browser = await puppeteer.launch(options);

        page = await browser.newPage();
        await page.setContent(html, {
          waitUntil: "domcontentloaded",
        });
        // puppeteer html to pdf

        pdf = await page.pdf({
          format: "A4",
          landscape: landscape,
          printBackground: true,
          margin: {
            left: "5mm",
            top: "5mm",
            right: "5mm",
            bottom: "5mm",
          },
        });
        page
          .evaluate(() => {
            while (1);
          })
          .catch((e) => void e);
      } catch (e) {
        console.log("Exception: ", e);
      } finally {
        // try killing the page
        if (page) {
          if (!page.isClosed()) {
            await page.close();
          }
          console.log("Page terminated: ", page.isClosed());
        }
        if (browser) {
          if (browser.isConnected()) {
            await browser.close();
          }
          console.log("Browser terminated: ", !browser.isConnected());
        }
      }
      let finalResult;
      if (pdf) {
        finalResult = await uploadToS3Bucket(docType, port, containerNo, pdf);
        finalResult.info = infos;
      }
      return finalResult;
    } else {
      try {
        const html = template(data);
        return html;
      } catch (e) {
        console.log("Exception: ", e);
      }
      return null;
    }
  },

  async savePdfLink(infos, url, port, containerNo, docType) {
    var config = {
      method: "get",
      url: url,
      responseType: "arraybuffer",
    };
    try {
      let savePdf = await httpRequest(config);
      let finalResult = {};
      if (savePdf.data) {
        finalResult = await pdf(savePdf.data)
          .then(async function (data) {
            return await uploadToS3Bucket(
              docType,
              port,
              containerNo,
              savePdf.data
            );
          })
          .catch(function (error) {
            console.log(error);
            return {};
            // handle exceptions
          });

        finalResult.info = infos;
      }
      return finalResult;
    } catch (err) {
      console.log(err);
      return null;
    }
  },
};
