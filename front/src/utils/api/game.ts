import axios, { AxiosResponse } from 'axios';

export const getCandidateList = (worldcupId: string, round: number): Promise<AxiosResponse> =>
  axios.get('/api/game/candidates', {
    params: {
      worldcupId,
      round,
    },
  });
