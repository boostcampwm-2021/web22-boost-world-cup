import { S3, Credentials, Endpoint } from 'aws-sdk';

const credentials = new Credentials({
  accessKeyId: process.env.NCP_ACCESS_KEY_ID,
  secretAccessKey: process.env.NCP_SECRET_ACCESS_KEY,
});
const endpoint = new Endpoint(process.env.NCP_END_POINT);
const region = process.env.NCP_REGION;
export default new S3({ credentials, endpoint, region });
