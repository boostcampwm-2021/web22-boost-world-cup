import axios from 'axios';
import { gameInfoData, candidateData } from '../../types/Datas';

export const getCandidatesList = async (worldcupId: string, round: number): Promise<candidateData> => {
  const response = await axios.get('/api/game/candidates', {
    params: {
      worldcupId,
      round,
    },
  });
  return response.data;
};

export const sendGameResult = async (winId: number | undefined, loseId: number | undefined): Promise<gameInfoData> => {
  const response = await axios.post(`/api/game/result`, {
    winId,
    loseId,
  });
  return response.data;
};
