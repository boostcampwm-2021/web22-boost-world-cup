import axios, { AxiosResponse } from 'axios';

export const getWorldcupList = (): Promise<AxiosResponse> => axios.get('/api/tags');
