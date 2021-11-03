import axios from 'axios';

interface ServerResponse {
  result: string;
  message: string | null;
}

export const signup = async (clientId: any, nickname: string, gender: number): Promise<ServerResponse> => {
  const response = await axios.post('/api/auth/signup', {
    clientId,
    nickname,
    gender,
    age: 1,
  });
  return response.data;
};
