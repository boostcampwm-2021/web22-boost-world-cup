import axios, { AxiosResponse } from 'axios';

export const getKeywordList = (): Promise<AxiosResponse> => axios.get('/api/keywords');
