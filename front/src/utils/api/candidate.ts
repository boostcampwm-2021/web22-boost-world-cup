import axios, { AxiosResponse } from 'axios';

export const deleteCandidate = (key: string): Promise<AxiosResponse> => axios.delete(`/api/candidates/${key}`);
