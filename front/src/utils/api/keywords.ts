import axios from 'axios';

interface TagType {
  name: string;
}
export const getWorldcupList = async (): Promise<Array<TagType>> => {
  const response = await axios.get('/api/tags');
  return response.data;
};
