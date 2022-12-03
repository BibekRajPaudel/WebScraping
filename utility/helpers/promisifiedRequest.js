const request = require('request');

const promisifiedRequest = function (options) {
  return new Promise((resolve, reject) => {
    request(options, (error, response) => {
      if (response) {
        const headers = response.rawHeaders;
        const findFirst = headers.indexOf('Set-Cookie');
        const findSecond = headers.indexOf('Set-Cookie', findFirst + 1);

        const firstCookie = headers[findFirst + 1].split(';')[0];
        const secondCookie = headers[findSecond + 1].split(';')[0];

        const res = `${firstCookie}; ${secondCookie};`;

        return resolve(res);
      }
      if (error) {
        return reject(error);
      }
    });
  });
};

module.exports = promisifiedRequest;
