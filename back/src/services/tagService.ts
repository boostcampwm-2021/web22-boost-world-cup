import { Keyword } from '../entity/Keyword';
import { getRepository } from 'typeorm';

export const findTen = async () => {
  const tagRepository = getRepository(Keyword);
  const tags = await tagRepository.find({
		select : ["name"],
		order : {
			cnt : "DESC"
		},
		take : 10,
	});
	return {
		result : "success",
		message : null,
		data : { tags : tags.map(tag => tag.name) },
	}
};

