import s3 from '../config/s3';

export const deleteFromEveryBucket = (key: string) => {
  const sizes = [
    { width: 120, height: 120 },
    { width: 140, height: 180 },
    { width: 50, height: 50 },
  ];
  const resizePrefixes = sizes.map(({ width, height }) => `w${width}h${height}`);
  const thumbnailPrefixes = ['blur', ...resizePrefixes];
  const deleteThumbnailsPromise = thumbnailPrefixes.map((prefix) =>
    s3.deleteObject({ Bucket: process.env.NCP_BUCKET_NAME, Key: `${prefix}/${key}.webp` }).promise(),
  );
  const deleteRawPromise = s3.deleteObject({ Bucket: process.env.NCP_BUCKET_NAME, Key: `raw/${key}` }).promise();
  return Promise.all([deleteRawPromise, ...deleteThumbnailsPromise]);
};
