const sharp = require('sharp');
const aws = require('aws-sdk');

const credentials = new aws.Credentials({
  accessKeyId: process.env.NCP_ACCESS_KEY_ID,
  secretAccessKey: process.env.NCP_SECRET_ACCESS_KEY,
});
const endpoint = new aws.Endpoint(process.env.NCP_END_POINT);
const region = process.env.NCP_REGION;
const s3 = new aws.S3({ credentials, endpoint, region });

const sizes = [
  { width: 120, height: 120 },
  { width: 140, height: 180 },
  { width: 50, height: 50 },
];

const getPutObjOption = (body, prefix, key) => {
  return {
    Bucket: process.env.NCP_BUCKET_NAME,
    Body: body,
    ACL: 'public-read',
    Key: `${prefix}/${key}`,
  };
};

async function resize(event) {
  try {
    const imgKey = event['object_name'];
    const newKey = `${imgKey.split('/')[1]}.webp`;
    const img = await s3.getObject({ Bucket: 'wiziboost-image', Key: imgKey }).promise();

    const saveBlurPromise = sharp(img.Body)
      .rotate()
      .webp()
      .blur(40)
      .toBuffer()
      .then((blurredImg) => s3.putObject(getPutObjOption(blurredImg, 'blur', newKey)).promise());
    const saveResizePromise = sizes.map(({ width, height }) =>
      sharp(img.Body)
        .rotate()
        .resize({ width, height, fit: 'outside' })
        .webp()
        .toBuffer()
        .then((resizedImg) => s3.putObject(getPutObjOption(resizedImg, `w${width}h${height}`, newKey)).promise()),
    );
    await Promise.all([saveBlurPromise, ...saveResizePromise]);
    return { statusCode: 200 };
  } catch (err) {}
}
exports.main = resize;
