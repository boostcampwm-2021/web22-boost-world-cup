import axios from 'axios';

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
