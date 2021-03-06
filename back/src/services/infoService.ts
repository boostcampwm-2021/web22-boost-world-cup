import { Info } from '../entity/Info';
import { getRepository } from 'typeorm';
import { GENDER, AGE } from '../types/common';

export const makeInfoData = (gender: number, age: number): Info => {
  const info = new Info();
  switch (gender) {
    case GENDER.MALE:
      info.male = 1;
      break;
    case GENDER.FEMALE:
      info.female = 1;
      break;
    default:
      break;
  }
  switch (age) {
    case AGE.TEENS:
      info.teens = 1;
      break;
    case AGE.TWENTIES:
      info.twenties = 1;
      break;
    case AGE.THIRTIES:
      info.thirties = 1;
      break;
    case AGE.FORTIES:
      info.forties = 1;
      break;
    case AGE.FIFTIES:
      info.fifties = 1;
      break;
    case AGE.ETC:
      info.etc = 1;
      break;
    default:
      break;
  }
  return info;
};

export const setInfoData = (info: Info, gender: number, age: number): Info => {
  switch (gender) {
    case GENDER.MALE:
      info.male += 1;
      break;
    case GENDER.FEMALE:
      info.female += 1;
      break;
    default:
      break;
  }
  switch (age) {
    case AGE.TEENS:
      info.teens += 1;
      break;
    case AGE.TWENTIES:
      info.twenties += 1;
      break;
    case AGE.THIRTIES:
      info.thirties += 1;
      break;
    case AGE.FORTIES:
      info.forties += 1;
      break;
    case AGE.FIFTIES:
      info.fifties += 1;
      break;
    case AGE.ETC:
      info.etc += 1;
      break;
    default:
      break;
  }
  return info;
};

export const removeByCandidateId = (id: number) => {
  const InfoRepository = getRepository(Info);
  return InfoRepository.createQueryBuilder('info')
    .leftJoin('info.candidate', 'candidate')
    .where('candidate.id = :id', { id })
    .delete()
    .execute();
};
