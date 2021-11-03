import { Worldcup } from './../entity/Worldcup';
import { getRepository } from 'typeorm';

export const findAll = async () => {
  const worldcupRepository = getRepository(Worldcup);
  return await worldcupRepository.find();
};
export const findPart = async (offset: number, limit: number) => {
  const worldcupRepository = getRepository(Worldcup);
  return await worldcupRepository.find({
    skip: offset,
    take: limit,
  });
};
