import axios, { AxiosResponse } from 'axios';
import { ImgInfo, WorldcupMetaData } from '../../types/Datas';

export const getWorldcupList = async (
  offset: number,
  limit: number,
  search: string,
  keyword: string,
): Promise<AxiosResponse> => {
  const response = await axios.get('/api/worldcups', { params: { offset, limit, search, keyword } });
  return response.data;
};

export const getMyWorldcupList = async (offset: number, limit: number): Promise<AxiosResponse> => {
  const response = await axios.get(`/api/worldcups/user`, { params: { offset, limit } });
  return response.data;
};

export const getWorldcupById = async (id: number): Promise<AxiosResponse> => {
  const response = await axios.get(`/api/worldcups/${id}?metaonly=true`);
  return response.data;
};

export const createWorldcup = async (
  title: string,
  desc: string,
  keywords: string[],
  imgInfos: ImgInfo[],
): Promise<AxiosResponse> => {
  const response = await axios.post('/api/worldcups', { title, desc, keywords, imgInfos });
  return response.data;
};

export const getWorldcupMetadata = async (id: number): Promise<AxiosResponse> => {
  const response = await axios.get(`/api/worldcups/${id}?metaonly=true`);
  return response.data;
};

export const getWorldcupCandidates = async (
  offset: number,
  limit: number,
  worldcupId: number,
): Promise<AxiosResponse> => {
  const response = await axios.get(`/api/worldcups/${worldcupId}/candidates?offset=${offset}&limit=${limit}`);
  return response.data;
};

export const patchWorldcupTitle = async (worldcupId: number, title: string): Promise<AxiosResponse> => {
  const response = await axios.patch(`/api/worldcups/${worldcupId}/title`, { title });
  return response.data;
};

export const patchWorldcupDesc = async (worldcupId: number, desc: string): Promise<AxiosResponse> => {
  const response = await axios.patch(`/api/worldcups/${worldcupId}/desc`, { desc });
  return response.data;
};

export const deleteWorldcup = async (worldcupId: number): Promise<AxiosResponse> => {
  const response = await axios.delete(`/api/worldcups/${worldcupId}`);
  return response.data;
};
