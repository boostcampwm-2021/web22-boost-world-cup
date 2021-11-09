import axios from 'axios';

interface responseData {
  result: string;
}
interface candidateData {
  id: number;
  name: string;
  url: string;
}

interface gameInfoData {
  title: string;
  round: number;
  currentRound: number;
  candidate1: candidateData;
  candidate2: candidateData;
}

export const initializeGame = async (worldcupId: string, round: number): Promise<responseData> => {
  const response = await axios.post('/api/game/start', {
    worldcupId,
    round,
  });
  return response.data;
};

export const getGameInfo = async (): Promise<gameInfoData> => {
  const response = await axios.get(`/api/game/candidates`);
  return response.data;
};
