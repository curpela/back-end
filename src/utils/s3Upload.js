const aws = require("aws-sdk");
const uuid = require("uuid/v4");

/*
 * s3 Upload
 * @param: File
 * @description: Streams file to s3 bucket
 * @limits: None - Able to upload any file type to s3 bucket
 */

const s3Upload = async file => {
  try {
    // create s3 instance
    const s3 = new aws.S3({
      region: process.env.AWS_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    });

    // destructure file obj
    let { createReadStream, filename, mimetype, encoding } = await file;

    // generate filename
    filename = _generateFilename(filename, mimetype);

    //create readable stream
    /*
     *  Introduction to nodejs streams - https://flaviocopes.com/nodejs-streams/
     */
    const stream = await createReadStream();

    // upload to s3
    const upload = await s3
      .upload({
        Key: filename,
        Bucket: process.env.AWS_BUCKET_NAME,
        Body: stream,
        ContentType: mimetype
      })
      .promise();

    // return uploaded file
    return {
      url: `${process.env.AWS_CLOUD_FRONT_DOMAIN}/${upload.Key}`,
      contentType: mimetype
    };
  } catch (error) {
    throw new Error("Sorry, but there was an issue while uploading to s3");
  }
};

// cleans and generates unique filename
function _generateFilename(filename, mimetype) {
  // generate id
  const id = uuid(); //123e4567-e89b-12d3-a456-426655440000

  // clean filename - original "c@t! video.mp4"
  const cleanFileName = filename
    .substring(0, filename.length - 4) // remove file extension from filename
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-"); // cleaned - "cat-video"

  // gets file extension from mimetype - mimeType "video/mp4"
  const fileExtension = mimetype.split("/")[1]; // fileExtension "mp4"

  // construct filename
  return `${id}-${cleanFileName}.${fileExtension}`; //123e4567-e89b-12d3-a456-426655440000-cat-video.mp4
}

module.exports = s3Upload;
