require("dotenv").config();
const AWS = require("aws-sdk");
AWS.config.update({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
  region: process.env.region,
});
let s3 = new AWS.S3();
let dateNow = Date.now();
async function uploadToS3(imageUrl, imageBuffer, fileType) {
  try {
    return new Promise((resolve, reject) => {
      resolve(
        (data = s3
          .upload({
            Bucket: process.env.bucketName,
            Key: `${imageUrl}_${dateNow}`,
            Body: imageBuffer,
            ContentType: fileType,
          })
          .promise())
      );
      reject("Could not complete operation!");
    });
  } catch (error) {
    console.log("UPLOAD ERROR", error);
  }
}

module.exports = { uploadToS3 };
