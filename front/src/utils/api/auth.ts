import axios, { AxiosResponse } from 'axios';

interface ServerResponse {
  result: string;
  message: string | null;
}

export const getUser = (): Promise<AxiosResponse> => axios.get('/api/auth/info');

export const signup = async (
  clientId: string,
  nickname: string,
  gender: number,
  age: number,
): Promise<ServerResponse> => {
  const response = await axios.post('/api/auth/signup', {
    clientId,
    nickname,
    gender,
    age,
  });
  return response.data;
};

export const logout = async (): Promise<ServerResponse> => {
  const response = await axios.get('/api/auth/logout');
  return response.data;
};

export const deleteUser = async (userId: number): Promise<ServerResponse> => {
  const response = await axios.delete(`/api/auth/user/${userId}`);
  return response.data;
};

export const putUser = async (id: number, nickname: string, gender: number, age: number): Promise<ServerResponse> => {
  const response = await axios.put(`/api/auth/user/${id}`, {
    id,
    nickname,
    gender,
    age,
  });
  return response.data;
};
