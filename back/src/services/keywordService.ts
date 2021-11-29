import { Keyword } from '../entity/Keyword';
import { getRepository } from 'typeorm';

export const getTopRankKeywords = () => {
  return getRepository(Keyword).createQueryBuilder('keyword').select('name').orderBy('cnt', 'DESC').limit(15).execute();
};

export const findByName = (name) => {
  return getRepository(Keyword).findOne({ where: { name } });
};

export const create = (name) => {
  const keywordRepository = getRepository(Keyword);
  const newKeyword = keywordRepository.create({ name });
  return keywordRepository.save(newKeyword);
};

export const findOrCreate = async (name) => {
  const keyword = await findByName(name);
  if (keyword) {
    return keyword;
  }
  return create(name);
};
