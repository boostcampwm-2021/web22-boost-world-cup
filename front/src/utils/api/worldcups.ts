import axios, { AxiosResponse } from 'axios';
import { ImgInfo, WorldcupMetaData } from '../../types/Datas';

interface pagingQueryType {
  id?: number;
  offset: number;
  limit: number;
  search?: string;
  keyword?: string;
}

interface worldcups {
  id: number;
  thumbnail1: string;
  thumbnail2: string;
  title: string;
  description: string;
}

export const getWorldcupList = async (query: pagingQueryType): Promise<Array<worldcups>> => {
  const response = await axios.get('/api/worldcups', {
    params: {
      offset: query.offset,
      limit: query.limit,
      search: query.search,
      keyword: query.keyword,
    },
  });
  return response.data.data.worldcup;
};

export const getMyWorldcupList = async (query: pagingQueryType): Promise<Array<worldcups>> => {
  const response = await axios.get(`/api/worldcups/user`, {
    params: {
      id: query.id,
      offset: query.offset,
      limit: query.limit,
    },
  });
  return response.data.data.worldcup;
};

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
