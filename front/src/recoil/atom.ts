import { atom } from 'recoil';

export const loginState = atom({
  key: 'loginState',
  default: true,
});

export const userState = atom({
  key: 'userState',
  default: {},
});
