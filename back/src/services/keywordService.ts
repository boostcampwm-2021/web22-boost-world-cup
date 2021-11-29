import { Keyword } from '../entity/Keyword';
import { getRepository } from 'typeorm';

export const getTopRankKeywords = () =>
  getRepository(Keyword).createQueryBuilder('keyword').select('name').orderBy('cnt', 'DESC').limit(15).execute();

export const findOrCreate = async (tagName) => {
  const tagRepository = getRepository(Keyword);
  const savedTag = await tagRepository.findOne({ where: { name: tagName } });
  if (savedTag) return savedTag;
  const newTag = tagRepository.create({ name: tagName });
  return tagRepository.save(newTag);
};
