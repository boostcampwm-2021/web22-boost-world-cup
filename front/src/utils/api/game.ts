import axios from 'axios';

interface responseData {
  result: string;
}

export const initializeGame = async (worldcupId: string, round: number): Promise<responseData> => {
  const response = await axios.post('/api/game/start', {
    worldcupId,
    round,
  });
  return response.data;
};
