import { Keyword } from '../entity/Keyword';
import { getRepository } from 'typeorm';

export const getTopRankKeywords = () =>
  getRepository(Keyword).createQueryBuilder('keyword').select('name').orderBy('cnt', 'DESC').limit(15).execute();

export const findOrCreate = async (name) => {
  const tagRepository = getRepository(Keyword);
  const savedTag = await tagRepository.findOne({ where: { name } });
  if (savedTag) return savedTag;
  const newTag = tagRepository.create({ name });
  return tagRepository.save(newTag);
};
