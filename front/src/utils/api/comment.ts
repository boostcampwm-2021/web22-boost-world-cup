import axios from 'axios';
import { CommentData } from '../../types/Datas';

interface createCommentResponse {
  result: 'success' | 'fail';
}

export const getComments = async (worldcupId: string): Promise<CommentData[]> => {
  const response = await axios.get(`/api/comments/${worldcupId}`);
  return response.data;
};

export const createComment = async (worldcupId: string, message: string): Promise<createCommentResponse> => {
  const response = await axios.post('/api/comments', {
    worldcupId,
    message,
  });
  return response.data;
};
