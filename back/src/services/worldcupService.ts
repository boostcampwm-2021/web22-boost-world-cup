import { Worldcup } from '../entity/Worldcup';
import { getRepository } from 'typeorm';

export const findAll = async () => {
  const worldcupRepository = getRepository(Worldcup);
  return await worldcupRepository.find();
};

export const findById = async (id) => {
  const worldcupRepository = getRepository(Worldcup);
  return await worldcupRepository.findOne(id);
};

export const save = async (worldcup) => {
  const worldcupRepository = getRepository(Worldcup);
  return await worldcupRepository.save(worldcup);
};

export const removeById = async (id) => {
  const worldcupRepository = getRepository(Worldcup);
  const worldcupToRemove = await findById(id);
  await worldcupRepository.remove(worldcupToRemove);
};
