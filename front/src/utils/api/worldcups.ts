import axios, { AxiosResponseHeaders } from 'axios';

interface pagingQueryType {
  offset: number;
  limit: number;
}

export const getWorldcupList = async (query: pagingQueryType) => {
  try {
    const response = await axios.get('/api/worldcups', {
      params: {
        offset: query.offset,
        limit: query.limit,
      },
    });
    return response.data.data.worldcup;
  } catch (error) {
    console.error(error);
    return error;
  }
};
