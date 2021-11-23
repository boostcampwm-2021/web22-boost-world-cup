import axios, { AxiosResponse } from 'axios';
import { RankingData } from '../../types/Datas';

export const getCandidateList = (offset: number, limit: number, worldcupId: string): Promise<AxiosResponse> => {
  return axios.get(`/api/ranking/${worldcupId}?offset=${offset}&limit=${limit}`);
};

export const sendCurrentResult = async (winId: number, loseId: number): Promise<void> => {
  await axios.post('/api/ranking/current', {
    winId,
    loseId,
  });
};

export const sendFinalResult = async (worldcupId: string, winId: number, loseId: number): Promise<void> => {
  await axios.post('/api/ranking/final', {
    worldcupId,
    winId,
    loseId,
  });
};
