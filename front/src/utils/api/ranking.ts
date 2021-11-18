import axios from 'axios';
import { RankingData } from '../../types/Datas';

export const getCandidateList = async (worldcupId: string): Promise<RankingData[]> => {
  const response = await axios.get(`/api/ranking/${worldcupId}`);
  const {
    data: { candidateLists },
  } = response;
  return candidateLists;
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
