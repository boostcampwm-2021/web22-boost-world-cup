import { User } from '../entity/User';
import { getRepository } from 'typeorm';

export const findById = async (id) => {
  const userRepository = getRepository(User);
  return await userRepository.findOne(id);
};
