import AWS from "aws-sdk";
import { constants as AWS_CONST } from "../../constant/aws";
import AmazonS3URI from "amazon-s3-uri";
import { logger, level } from "../../config/logger";
const ID = AWS_CONST.S3_ACCESS_ID;
const SECRET = AWS_CONST.S3_SECRET_KEY;
let randomNumber = Math.floor(Math.random() * 100000 + 1);
let currentDate = Date.now();
let randomString = `${randomNumber}-${currentDate}`;

// const BUCKET_NAME = AWS_CONST.S3_BUCKET_NAME;
const s3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET,
});

export const uploadFile = (bucketName, file, fileName) => {
  fileName = `${randomString}-${fileName}`;
  return new Promise((resolve, reject) => {
    const params = {
      Bucket: bucketName,
      Key: fileName,
      Body: file,
      ContentType: "image/jpeg",
    };

    s3.upload(params, function (err, data) {
      if (err) {
        reject(err);
      }
      resolve(data.Location);
    });
  });
};

export const deleteFile = (bucketName, url) => {
  return new Promise((resolve, reject) => {
    try {
      const { key } = AmazonS3URI(url);
      const params = {
        Bucket: bucketName,
        Key: key,
      };

      s3.deleteObject(params, function (err, data) {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    } catch (err) {
      logger.log(level.error, `${url} is not a valid S3 uri err=${err}`);
    }
  });
};

export const uploadVideoFile = (bucketName, file, fileName) => {
  fileName = `${new Date().getTime()}-${fileName}`;
  return new Promise((resolve, reject) => {
    const params = {
      Bucket: bucketName,
      Key: fileName,
      Body: file,
      ContentType: "video/mp4",
    };

    const options = {
      partSize: 30 * 1024 * 1024,
      queueSize: 1,
    };

    s3.upload(params, options, function (err, data) {
      if (err) {
        reject(err);
      }
      resolve(data.Location);
    });
  });
};
