import { Worldcup } from '../entity/Worldcup';
import { getRepository, Like } from 'typeorm';

export const findAll = async () => {
  const worldcupRepository = getRepository(Worldcup);
  const worldcups = await worldcupRepository.find({
    select: ['id', 'title', 'thumbnail1', 'thumbnail2', 'description'],
    where: { isTemp: false },
  });
  return {
    result: 'success',
    message: null,
    data: {
      worldcup: worldcups,
    },
  };
};

export const findFromPage = async (offset, limit) => {
  const worldcupRepository = getRepository(Worldcup);
  return await worldcupRepository.find({
    select: ['id', 'title', 'thumbnail1', 'thumbnail2', 'description'],
    where: { isTemp: false },
    skip: Number(offset),
    take: Number(limit),
  });
};

export const findByKeyword = async (offset, limit, keyword) => {
  const worldcupRepository = getRepository(Worldcup);
  return await worldcupRepository.find({
    select: ['id', 'title', 'thumbnail1', 'thumbnail2', 'description'],
    where: { isTemp: false, title: Like(`%${keyword}%`) },
    skip: Number(offset),
    take: Number(limit),
  });
};

export const findById = async (id) => {
  const worldcupRepository = getRepository(Worldcup);
  return await worldcupRepository.findOne(id, { relations: ['candidates'] });
};

export const save = async (worldcup) => {
  const worldcupRepository = getRepository(Worldcup);
  return await worldcupRepository.save(worldcup);
};

export const removeById = async (id) => {
  const worldcupRepository = getRepository(Worldcup);
  const worldcupToRemove = await findById(id);
  await worldcupRepository.remove(worldcupToRemove);
  return await worldcupRepository.find();
};
