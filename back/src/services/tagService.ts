import { Keyword } from '../entity/Keyword';
import { getRepository } from 'typeorm';

export const getTopRankTags = async () => {
  const tagList = await getRepository(Keyword)
    .createQueryBuilder('keyword')
    .select('name')
    .orderBy('cnt', 'DESC')
    .limit(15)
    .execute();
  return tagList;
};

export const findOrCreate = async (tagName) => {
  const tagRepository = getRepository(Keyword);
  const savedTag = await tagRepository.findOne({ where: { name: tagName } });
  if (savedTag) return savedTag;
  const newTag = tagRepository.create({ name: tagName });
  return tagRepository.save(newTag);
};
