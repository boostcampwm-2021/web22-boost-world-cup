import { Keyword } from '../entity/Keyword';
import { getRepository } from 'typeorm';

export const findTen = async () => {
  const tagRepository = getRepository(Keyword);
  const tags = await tagRepository.find();
	tags.sort((a,b) => b.cnt - a.cnt);
	return {
		result : "success",
		message : null,
		data : {tags : tags.map(tag => tag.name).slice(0,10)},
	}
};
