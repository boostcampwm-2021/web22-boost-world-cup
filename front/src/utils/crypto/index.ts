import CryptoJS from 'crypto-js';
import { gameInfoData } from '../../types/Datas';

const secretKey = process.env.REACT_APP_SECRET_KEY;

export const objectEncryption = (obj: gameInfoData): string => {
  return secretKey
    ? CryptoJS.AES.encrypt(JSON.stringify(obj), secretKey).toString()
    : CryptoJS.AES.encrypt(JSON.stringify(obj), 'wiziboost1246').toString();
};

export const objectDecryption = (cipherText: string): gameInfoData => {
  const bytes = secretKey
    ? CryptoJS.AES.decrypt(cipherText, secretKey)
    : CryptoJS.AES.decrypt(cipherText, 'wiziboost1246');
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};
