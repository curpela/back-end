const aws = require("aws-sdk");
const util = require("util");
const fs = require("fs");
const uuid = require("uuid/v4");

/*
 * WIP - NOT PROD READY
 *
 */

const s3Upload = async file => {
  try {
    // create s3 instance
    const s3 = new aws.S3({
      region: process.env.AWS_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    });

    let { createReadStream, filename, mimetype, encoding } = await file;
    filename = _generateFilename(filename, mimetype);

    const result = await new Promise(async (resolve, reject) => {
      const stream = createReadStream();

      const up = await s3
        .upload({
          Key: filename,
          Bucket: process.env.AWS_BUCKET_NAME,
          Body: stream,
          ContentType: mimetype
        })
        .promise();

      return resolve(`http://d2lvnywid6p0z4.cloudfront.net/${filename}`);
    });

    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Sorry, but there was an issue uploading that image");
  }
};

// Generate unique file
function _generateFilename(filename, mimetype) {
  console.log(filename);
  const cleanFileName = filename.toLowerCase().replace(/[^a-z0-9]/g, "-");
  const id = uuid();
  return `${id}-${cleanFileName}.${mimetype.split("/")[1]}`;
}

module.exports = s3Upload;
