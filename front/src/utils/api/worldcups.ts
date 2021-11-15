import axios, { AxiosResponse } from 'axios';
import { ImgInfo } from '../../types/Datas';

interface pagingQueryType {
  offset: number;
  limit: number;
}
interface searchQueryType {
  offset: number;
  limit: number;
  search: string;
}
interface keywordQueryType {
  offset: number;
  limit: number;
  keyword: string;
}
interface ServerResponse {
  id: string;
  message: string | null;
  data: null | worldcups;
}
interface worldcups {
  id: number;
  thumbnail1: string;
  thumbnail2: string;
  title: string;
  description: string;
}
export const getWorldcupList = async (query: pagingQueryType): Promise<ServerResponse> => {
  const response = await axios.get('/api/worldcups', {
    params: {
      offset: query.offset,
      limit: query.limit,
    },
  });
  return response.data.data.worldcup;
};
export const getWorldcupListBySearch = async (query: searchQueryType): Promise<ServerResponse> => {
  const response = await axios.get('/api/worldcups', {
    params: {
      offset: query.offset,
      limit: query.limit,
      search: query.search,
    },
  });
  return response.data.data.worldcup;
};
export const getWorldcupListByKeyword = async (query: keywordQueryType) => {
  const response = await axios.get('/api/worldcups', {
    params: {
      offset: query.offset,
      limit: query.limit,
      keyword: query.keyword,
    },
  });
  return response.data.data.worldcup;
};

export const getWorldcupById = async (id: number) => {
  const response = await axios.get(`/api/worldcups/${id}`);
  const { data: worldcup } = response;
  return worldcup;
};

export const createWorldcup = (
  title: string,
  desc: string,
  keywords: string[],
  imgInfos: ImgInfo[],
): Promise<AxiosResponse> => axios.post('/api/worldcups', { title, desc, keywords, imgInfos });
