import axios, { AxiosResponse } from 'axios';
import { ImgInfo } from '../../types/Datas';

interface pagingQueryType {
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

export const getWorldcupMetadata = (id: number): Promise<AxiosResponse> =>
  axios.get(`/api/worldcups/${id}?metaonly=true`);

export const getWorldcupCandidates = (worldcupId: number, offset: number, limit: number): Promise<AxiosResponse> =>
  axios.get(`/api/worldcups/${worldcupId}/candidates?offset=${offset}&limit=${limit}`);

export const patchWorldcupTitle = (worldcupId: number, title: string): Promise<AxiosResponse> =>
  axios.patch(`/api/worldcups/${worldcupId}/title`, { title });
