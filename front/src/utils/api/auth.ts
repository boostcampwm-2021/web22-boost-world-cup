import axios from 'axios';

interface ServerResponse {
  result: string;
  message: string | null;
  data: null | UserData;
}
interface UserData {
  nickname: string;
  gender: number;
  age: number;
}

export const getUser = async (): Promise<ServerResponse> => {
  const response = await axios.get('/api/auth/info');
  const {
    data: { data: userInfo },
  } = response;
  return userInfo;
};

export const signup = async (clientId: any, nickname: string, gender: number, age: number): Promise<ServerResponse> => {
  const response = await axios.post('/api/auth/signup', {
    clientId,
    nickname,
    gender,
    age,
  });
  return response.data;
};

export const logout = async () => {
  const response = await axios.get('/api/auth/logout');
  return response.data;
};
