import axios, { AxiosResponse } from 'axios';
import { ImgInfo, WorldcupMetaData } from '../../types/Datas';

export const getWorldcupList = (
  offset: number,
  limit: number,
  search: string,
  keyword: string,
): Promise<AxiosResponse> => axios.get('/api/worldcups', { params: { offset, limit, search, keyword } });

export const getMyWorldcupList = (offset: number, limit: number): Promise<AxiosResponse> =>
  axios.get(`/api/worldcups/user`, { params: { offset, limit } });

export const getWorldcupById = async (id: number): Promise<WorldcupMetaData> => {
  const response = await axios.get(`/api/worldcups/${id}?metaonly=true`);
  const { data: worldcup } = response;
  return worldcup;
};

export const createWorldcup = (
  title: string,
  desc: string,
  keywords: string[],
  imgInfos: ImgInfo[],
): Promise<AxiosResponse> => axios.post('/api/worldcups', { title, desc, keywords, imgInfos });

export const getWorldcupMetadata = (id: number): Promise<AxiosResponse> =>
  axios.get(`/api/worldcups/${id}?metaonly=true`);

export const getWorldcupCandidates = (offset: number, limit: number, worldcupId: number): Promise<AxiosResponse> =>
  axios.get(`/api/worldcups/${worldcupId}/candidates?offset=${offset}&limit=${limit}`);

export const patchWorldcupTitle = (worldcupId: number, title: string): Promise<AxiosResponse> =>
  axios.patch(`/api/worldcups/${worldcupId}/title`, { title });

export const patchWorldcupDesc = (worldcupId: number, desc: string): Promise<AxiosResponse> =>
  axios.patch(`/api/worldcups/${worldcupId}/desc`, { desc });

export const deleteWorldcup = (worldcupId: number): Promise<AxiosResponse> =>
  axios.delete(`/api/worldcups/${worldcupId}`);
