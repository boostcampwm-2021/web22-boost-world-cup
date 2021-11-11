import axios from 'axios';
import { candidateData } from '../../types/Datas';

export const getCandidatesList = async (worldcupId: string, round: number): Promise<candidateData[]> => {
  const response = await axios.get('/api/game/candidates', {
    params: {
      worldcupId,
      round,
    },
  });
  return response.data;
};
