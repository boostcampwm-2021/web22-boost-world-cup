import axios from 'axios';

interface pagingQueryType {
  offset: number;
  limit: number;
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
