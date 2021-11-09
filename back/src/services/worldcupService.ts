import { Worldcup } from '../entity/Worldcup';
import { getRepository } from 'typeorm';

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
  const worldcups = await worldcupRepository.find({
    select: ['id', 'title', 'thumbnail1', 'thumbnail2', 'description'],
    where: { isTemp: false },
    skip: Number(offset),
    take: Number(limit),
  });

  return {
    result: 'success',
    message: null,
    data: {
      worldcup: worldcups,
    },
  };
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

export const findByKeyword = async (keyword: string) => {
  const worldcupRepository = getRepository(Worldcup);
};

export const getWorldcupTitle = async (id: number) => {
  const worldcupRepository = getRepository(Worldcup);
  const worldcup = await worldcupRepository.findOne(id, { select: ['title'] });
  return worldcup.title;
};
