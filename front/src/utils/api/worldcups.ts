import axios, { AxiosResponseHeaders } from 'axios';

interface pagingQueryType {
  offset: number;
  limit: number;
}
const instance = axios.create({
  baseURL: 'http://localhost:8000/api/worldcups/',
  headers: {
    'Content-type': 'application/json',
  },
});
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
