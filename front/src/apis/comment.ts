import axios, { AxiosResponse } from 'axios';

export const getComments = (offset: number, limit: number, worldcupId: string): Promise<AxiosResponse> =>
  axios.get(`/api/worldcups/${worldcupId}/comments`, { params: { offset, limit } });

export const createComment = (worldcupId: string, message: string): Promise<AxiosResponse> =>
  axios.post(`/api/worldcups/${worldcupId}/comments`, {
    message,
  });

export const deleteComment = (commentId: string): Promise<AxiosResponse> =>
  axios.delete(`/api/worldcups/comments/${commentId}`);

export const getCommentsCount = (worldcupId: string): Promise<AxiosResponse> =>
  axios.get(`/api/worldcups/${worldcupId}/comments`, {
    params: {
      length: true,
    },
  });
