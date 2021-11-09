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

export const findBySearchWord = async (offset, limit, searchWord) => {
  const worldcupRepository = getRepository(Worldcup);
  return await worldcupRepository.find({
    select: ['id', 'title', 'thumbnail1', 'thumbnail2', 'description'],
    where: { isTemp: false, title: Like(`%${searchWord}%`) },
    skip: Number(offset),
    take: Number(limit),
  });
};

export const findByKeyword = async (offset, limit, keyword) => {
  return await getRepository(Worldcup)
    .createQueryBuilder('worldcup')
    .select(['worldcup.id', 'worldcup.title', 'worldcup.thumbnail1', 'worldcup.thumbnail2', 'worldcup.description'])
    .innerJoin('worldcup.keywords', 'keywords')
    .where('keywords.name= :name', { name: keyword })
    .skip(Number(offset))
    .take(Number(limit))
    .execute();
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
