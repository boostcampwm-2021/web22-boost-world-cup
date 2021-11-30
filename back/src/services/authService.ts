import { User } from '../entity/User';
import { getRepository } from 'typeorm';
import ApiResult from '../utils/ApiResult';

const { succeed, failed } = ApiResult;

export const findById = (id) => {
  return getRepository(User).findOne(id);
};

export const findByProviderId = (providerId) => {
  return getRepository(User).findOne({ providerId });
};

export const save = (user) => {
  return getRepository(User).save(user);
};

export const saveInitUser = (providerId) => {
  const userRepository = getRepository(User);
  const newUser = userRepository.create({ providerId });
  return userRepository.save(newUser);
};

export const update = (user) => {
  return getRepository(User).save(user);
};

export const remove = async (userId) => {
  await getRepository(User).delete({ id: userId });
  return succeed(null);
};
