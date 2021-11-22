import axios, { AxiosResponse } from 'axios';
import { CommentData } from '../../types/Datas';

export const getComments = (offset: number, limit: number, worldcupId: string): Promise<AxiosResponse> =>
  axios.get(`/api/worldcups/${worldcupId}/comments`, { params: { offset, limit } });

export const createComment = async (worldcupId: string, message: string): Promise<CommentData> => {
  const response = await axios.post(`/api/worldcups/${worldcupId}/comments`, {
    message,
  });
  return response.data;
};

interface commonResponse {
  result: 'success' | 'fail';
}

export const deleteComment = async (commentId: string): Promise<commonResponse> => {
  const response = await axios.delete(`/api/worldcups/comments/${commentId}`);
  return response.data;
};

interface lengthResponse {
  commentCount: number;
}

export const getCommentsCount = async (worldcupId: string): Promise<lengthResponse> => {
  const response = await axios.get(`/api/worldcups/${worldcupId}/comments`, {
    params: {
      length: true,
    },
  });
  return response.data;
};
