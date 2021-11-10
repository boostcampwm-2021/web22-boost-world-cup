import { NextFunction, Request, Response } from 'express';
import * as candidateService from '../services/candidateService';
import s3 from '../config/s3';

const candidateController = {
  remove: async (request: Request, response: Response, next: NextFunction) => {
    const { key } = request.params;
    const buckets = ['wiziboost-image-raw', 'image-w143h160', 'image-w120h120'];
    await Promise.all(
      buckets.map((bucket) =>
        s3
          .deleteObject({
            Bucket: bucket,
            Key: key,
          })
          .promise(),
      ),
    );
    await candidateService.removeByKey(key);
    response.json({ result: 'success' });
  },
};

export default candidateController;
