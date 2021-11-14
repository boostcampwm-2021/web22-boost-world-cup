import axios, { AxiosResponse } from 'axios';

export const getSignedURLs = (contentTypes: string[]): Promise<AxiosResponse> =>
  axios.post('/api/bucket/url', { contentTypes });
