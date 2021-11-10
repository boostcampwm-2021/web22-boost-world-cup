import axios from 'axios';
import { gameInfoData } from '../../types/Datas';

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

export const getGameInfo = async (): Promise<gameInfoData> => {
  const response = await axios.get(`/api/game/candidates`);
  return response.data;
};

export const sendGameResult = async (winId: number | undefined, loseId: number | undefined): Promise<gameInfoData> => {
  const response = await axios.post(`/api/game/result`, {
    winId,
    loseId,
  });
  return response.data;
};
