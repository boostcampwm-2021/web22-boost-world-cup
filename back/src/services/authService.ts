import { User } from '../entity/User';
import { getRepository } from 'typeorm';

export const findByProviderId = async (providerId) => {
  const userRepository = getRepository(User);
  return await userRepository.findOne({ providerId });
};

export const save = async (providerId) => {
  const userRepository = getRepository(User);
  const newUser = new User();
  newUser.providerId = providerId;
  return await userRepository.save(newUser);
};