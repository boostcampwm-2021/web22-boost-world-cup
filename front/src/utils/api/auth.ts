import axios, { AxiosResponse } from 'axios';

export const getUser = (): Promise<AxiosResponse> => axios.get('/api/auth/info');

export const signup = (clientId: string, nickname: string, gender: number, age: number): Promise<AxiosResponse> =>
  axios.post('/api/auth/signup', {
    clientId,
    nickname,
    gender,
    age,
  });

export const logout = (): Promise<AxiosResponse> => axios.get('/api/auth/logout');

export const deleteUser = (userId: number): Promise<AxiosResponse> => axios.delete(`/api/auth/user/${userId}`);

export const putUser = (id: number, nickname: string, gender: number, age: number): Promise<AxiosResponse> =>
  axios.put(`/api/auth/user/${id}`, {
    id,
    nickname,
    gender,
    age,
  });
