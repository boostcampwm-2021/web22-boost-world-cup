import { User } from '../entity/User';
import { getRepository } from 'typeorm';
import ApiResult from '../utils/ApiResult';

const { succeed, failed } = ApiResult;

export const findById = async (id) => {
  const userRepository = getRepository(User);
  return await userRepository.findOne(id);
};

export const findByProviderId = async (providerId) => {
  const userRepository = getRepository(User);
  return await userRepository.findOne({ providerId });
};

export const save = async (user) => {
  const userRepository = getRepository(User);
  return await userRepository.save(user);
};

export const saveInitUser = async (providerId) => {
  const userRepository = getRepository(User);
  const newUser = new User();
  newUser.providerId = providerId;
  return await userRepository.save(newUser);
};

export const update = async (user) => {
  const userRepository = getRepository(User);
  return await userRepository.save(user);
};

export const remove = async (userId) => {
  const userRepository = getRepository(User);
  await userRepository.delete({ id: userId });
  return succeed(null);
};
