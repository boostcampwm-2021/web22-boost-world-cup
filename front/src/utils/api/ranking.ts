import axios, { AxiosResponse } from 'axios';

export const getCandidateList = (
  offset: number,
  limit: number,
  worldcupId: string,
  search: string,
): Promise<AxiosResponse> => axios.get(`/api/ranking/${worldcupId}`, { params: { offset, limit, search } });

export const sendCurrentResult = (winId: number, loseId: number): Promise<AxiosResponse> =>
  axios.post('/api/ranking/current', {
    winId,
    loseId,
  });

export const sendFinalResult = (worldcupId: string, winId: number, loseId: number): Promise<AxiosResponse> =>
  axios.post('/api/ranking/final', {
    worldcupId,
    winId,
    loseId,
  });
