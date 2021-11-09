import axios from 'axios';

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
export const getWorldcupList = async (query: pagingQueryType) => {
  const response = await axios.get('/api/worldcups', {
    params: {
      offset: query.offset,
      limit: query.limit,
    },
  });
  return response.data.data.worldcup;
};
export const getWorldcupListBySearch = async (query: searchQueryType) => {
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
