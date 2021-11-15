import axios from 'axios';

interface createCommentResponse {
  result: 'success' | 'fail';
}

export const createComment = async (worldcupId: string, message: string): Promise<createCommentResponse> => {
  const response = await axios.post('/api/comments', {
    worldcupId,
    message,
  });
  return response.data;
};
