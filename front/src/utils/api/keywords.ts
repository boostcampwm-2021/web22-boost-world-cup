import axios, { AxiosResponse } from 'axios';

export const getTagList = (): Promise<AxiosResponse> => axios.get('/api/tags');
