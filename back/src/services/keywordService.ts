import { Keyword } from '../entity/Keyword';
import { getRepository } from 'typeorm';

export const getTopRankKeywords = () => {
  return getRepository(Keyword).createQueryBuilder('keyword').select('name').orderBy('cnt', 'DESC').limit(15).execute();
};

export const findByName = async (name) => {
  const keywordRepository = getRepository(Keyword);
  const keyword = await keywordRepository.findOne({ where: { name } });
  if (keyword) {
    keyword.cnt = keyword.cnt + 1;
    return keywordRepository.save(keyword);
  }
};

export const create = (name) => {
  const keywordRepository = getRepository(Keyword);
  const newKeyword = keywordRepository.create({ name });
  return keywordRepository.save(newKeyword);
};

export const findOrCreate = async (name) => {
  const keyword = await findByName(name);
  return keyword ? keyword : create(name);
};
