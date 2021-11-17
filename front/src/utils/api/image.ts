import axios, { AxiosResponse } from 'axios';

export const getSignedURLs = (contentTypes: string[]): Promise<AxiosResponse> =>
  axios.post('/api/bucket/url', { contentTypes });

export const uploadImage = (presignedURL: string, file: ArrayBuffer, type: string): Promise<AxiosResponse> =>
  axios.put(presignedURL, file, {
    headers: { 'Content-Type': type, 'x-amz-acl': 'public-read' },
  });
