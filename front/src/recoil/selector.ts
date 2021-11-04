import { selector } from 'recoil';
import { getUser } from '../utils/api/auth';

export const currentUser = selector({
  key: 'CurrentUser',
  get: async () => {
    const userInfo = await getUser();
    return userInfo;
  },
});
