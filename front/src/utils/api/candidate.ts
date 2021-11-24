import axios, { AxiosResponse } from 'axios';
import { ImgInfo } from '../../types/Datas';

export const deleteCandidate = async (key: string): Promise<AxiosResponse> => {
  const response = await axios.delete(`/api/candidates/${key}`);
  return response.data;
};

export const createCandidates = async (worldcupId: number, newImgInfos: ImgInfo[]): Promise<AxiosResponse> => {
  const response = await axios.post('/api/candidates', { worldcupId, newImgInfos });
  return response.data;
};

export const patchCandidate = async (key: string, name: string, newKey?: string): Promise<AxiosResponse> => {
  const response = await axios.patch(`/api/candidates/${key}`, { newKey, name });
  return response.data;
};
