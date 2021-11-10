const sharp = require('sharp');
const aws = require('aws-sdk');
const sizes = [
  { width: 120, height: 120 },
  { width: 143, height: 160 },
];
const credentials = new aws.Credentials({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
const endpoint = new aws.Endpoint('https://kr.object.ncloudstorage.com');
const region = 'kr-standard';
const s3 = new aws.S3({ credentials, endpoint, region });

async function resize(event) {
  try {
    const imgKey = event['object_name'];
    const newKey = imgKey.match(/^(?<key>.+)\.(?<extension>[a-zA-Z]+)$/).groups.key + '.webp';
    const img = await s3.getObject({ Bucket: 'wiziboost-image-raw', Key: imgKey }).promise();
    await Promise.all(
      sizes.map(({ width, height }) =>
        sharp(img.Body)
          .rotate()
          .resize({ width, height, fit: 'outside' })
          .webp()
          .toBuffer()
          .then((resizedImg) =>
            s3
              .putObject({
                Bucket: `image-w${width}h${height}`,
                Body: resizedImg,
                Key: newKey,
                ACL: 'public-read',
              })
              .promise(),
          ),
      ),
    );
    return {
      statusCode: 200,
    };
  } catch (err) {}
}

exports.main = resize;
