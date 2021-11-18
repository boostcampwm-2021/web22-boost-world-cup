import { Keyword } from '../entity/Keyword';
import { getRepository } from 'typeorm';

export const findTen = async () => {
  const tagRepository = getRepository(Keyword);
  const tags = await tagRepository.find({
    select: ['name'],
    order: {
      cnt: 'DESC',
    },
    take: 10,
  });
  return {
    result: 'success',
    message: null,
    data: { tags: tags.map((tag) => tag.name) },
  };
};

export const findOrCreate = async (tagName) => {
  const tagRepository = getRepository(Keyword);
  const savedTag = await tagRepository.findOne({ where: { name: tagName } });
  if (savedTag) return savedTag;
  const newTag = tagRepository.create({ name: tagName });
  return tagRepository.save(newTag);
};
