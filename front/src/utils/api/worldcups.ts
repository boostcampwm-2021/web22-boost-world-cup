import axios from 'axios';

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

export const get = async (query: pagingQueryType) => {
  try {
    const response = await instance.get('', {
      params: {
        offset: query.offset,
        limit: query.limit,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
