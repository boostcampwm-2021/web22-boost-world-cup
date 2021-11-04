import axios from 'axios';

export const getWorldcupList = async (): Promise<Array<string>> => {
  const response = await axios.get('/api/tags');
  return response.data.data.tags;
};
