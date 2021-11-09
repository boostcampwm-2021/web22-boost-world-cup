import axios from 'axios';

interface pagingQueryType {
  offset: number;
  limit: number;
}
interface searchQuerytype {
  keyword: string;
}
export const getWorldcupList = async (query: pagingQueryType) => {
  const response = await axios.get('/api/worldcups', {
    params: {
      offset: query.offset,
      limit: query.limit,
    },
  });
  return response.data;
};
export const getWorldcupListByKeyword = async (query: searchQuerytype) => {
  const response = await axios.get('/api/worldcups', {
    params: {
      keyword: query.keyword,
    },
  });
  return response.data;
};
