import { NextFunction, Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import { extension } from 'mime-types';
import s3 from '../config/s3';

const bucketController = {
  getSignedURL: async (request: Request, response: Response, next: NextFunction) => {
    const { contentTypes } = request.body;
    const presignedData = await Promise.all(
      contentTypes.map(async (type: string) => {
        const key = `${uuid()}.${extension(type)}`;
        const presignedURL = await s3.getSignedUrlPromise('putObject', {
          Bucket: process.env.NCP_BUCKET_NAME,
          Key: key,
          Expires: 60,
          ContentType: type,
        });
        return { presignedURL, key };
      }),
    );
    response.json(presignedData);
  },
};

export default bucketController;
