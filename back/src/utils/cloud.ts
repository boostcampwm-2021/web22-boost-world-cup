import s3 from '../config/s3';

export const deleteFromEveryBucket = (key: string) => {
  const sizes = [{ width: 120, height: 120 }];
  return Promise.all([
    s3
      .deleteObject({
        Bucket: process.env.NCP_BUCKET_NAME,
        Key: key,
      })
      .promise(),
    Promise.all(
      sizes.map(({ width, height }) =>
        s3
          .deleteObject({
            Bucket: `image-w${width}h${height}`,
            Key: `${key}.webp`,
          })
          .promise(),
      ),
    ),
  ]);
};
