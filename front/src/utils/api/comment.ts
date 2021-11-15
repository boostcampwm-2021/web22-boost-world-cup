import axios from 'axios';

export const createComment = async (worldcupId: string, message: string): Promise<void> => {
  const response = await axios.post('/api/comments', {
    worldcupId,
    message,
  });
  console.log(response);
  // return response.data;
};
