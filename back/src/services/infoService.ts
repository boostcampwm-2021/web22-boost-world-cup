import { Info } from '../entity/Info';
import { getRepository } from 'typeorm';
import { Candidate } from '../entity/Candidate';

export const makeInfoData = async (candidate: Candidate) => {
  const infoRepository = getRepository(Info);
  const info = new Info();
  info.candidate = candidate;
  await infoRepository.save(info);
};
