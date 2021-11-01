import { User } from '../entity/User';
import { getRepository } from 'typeorm';

export const findAll = async () => {
  const userRepository = getRepository(User);
  return await userRepository.find();
};

export const findById = async (id) => {
  const userRepository = getRepository(User);
  return await userRepository.findOne(id);
};

export const save = async (user) => {
  const userRepository = getRepository(User);
  return await userRepository.save(user);
};

export const removeById = async (id) => {
  const userRepository = getRepository(User);
  const userToRemove = await findById(id);
  await userRepository.remove(userToRemove);
};
