import { Worldcup } from '../entity/Worldcup';
import { findOrCreate as findOrCreateTag } from './tagService';
import { save as saveCandidates, getTotalCount as getCandidateTotalCnt } from './candidateService';
import { findById as findUserById } from './userService';
import { Repository, getRepository, Like } from 'typeorm';

export const findFromPage = async (offset: number, limit: number): Promise<Worldcup[]> => {
  const worldcupRepository: Repository<Worldcup> = getRepository(Worldcup);
  return await worldcupRepository
    .createQueryBuilder('worldcup')
    .where('worldcup.is_temp = :isTemp', { isTemp: false })
    .skip(offset)
    .take(limit)
    .getMany();
};

export const findBySearchWord = async (offset: number, limit: number, searchWord): Promise<Worldcup[]> => {
  const worldcupRepository: Repository<Worldcup> = getRepository(Worldcup);
  return await worldcupRepository
    .createQueryBuilder('worldcup')
    .where('worldcup.is_temp = :isTemp', { isTemp: false })
    .andWhere('worldcup.title like :title', { title: `%${searchWord}%` })
    .skip(offset)
    .take(limit)
    .getMany();
};

export const findByKeyword = async (offset: number, limit: number, keyword): Promise<Worldcup[]> => {
  const worldcupRepository: Repository<Worldcup> = getRepository(Worldcup);
  return await worldcupRepository
    .createQueryBuilder('worldcup')
    .innerJoin('worldcup.keywords', 'keywords')
    .where('keywords.name= :name', { name: keyword })
    .offset(offset)
    .limit(limit)
    .getMany();
};

export const findMyWorldcup = async (id, offset, limit) => {
  const worldcupRepository = getRepository(Worldcup);
  return await worldcupRepository.find({
    select: ['id', 'title', 'thumbnail1', 'thumbnail2', 'description'],
    where: { user: id },
    skip: Number(offset),
    take: Number(limit),
  });
};

export const findById = async (id) => {
  const worldcupRepository = getRepository(Worldcup);
  return await worldcupRepository.findOne(id, { relations: ['candidates'] });
};

export const save = async (title: string, description: string, keywordNames: string[], imgInfos, userId: number) => {
  const worldcupRepository = getRepository(Worldcup);
  const [keywords, user] = await Promise.all([
    Promise.all(keywordNames.map((name: string) => findOrCreateTag(name))),
    findUserById(userId),
  ]);
  const [thumbnail1, thumbnail2] = imgInfos
    .slice(0, 2)
    .map(({ key }) => `${process.env.IMG_URL_END_POINT}/${key}.webp`);
  const newWorldcup = worldcupRepository.create({
    title,
    thumbnail1,
    thumbnail2,
    description,
    keywords,
    user,
  });
  return Promise.all([worldcupRepository.save(newWorldcup), saveCandidates(imgInfos, newWorldcup)]);
};

export const removeById = async (id) => {
  const worldcupRepository = getRepository(Worldcup);
  const worldcupToRemove = await findById(id);
  await worldcupRepository.remove(worldcupToRemove);
  return await worldcupRepository.find();
};

export const getWorldcupTitle = async (id: number) => {
  const worldcupRepository = getRepository(Worldcup);
  const worldcup = await worldcupRepository.findOne(id, { select: ['title'] });
  return worldcup.title;
};

export const plusTotalCnt = async (id: number) => {
  const worldcupRepository = getRepository(Worldcup);
  const worldcup = await worldcupRepository.findOne(id);
  worldcup.totalCnt += 1;
  return await worldcupRepository.save(worldcup);
};

export const patchWorldcupTitle = async (id: number, title: string) => {
  const worldcupRepository = getRepository(Worldcup);
  const worldcup = await worldcupRepository.findOne(id);
  worldcup.title = title;
  worldcupRepository.save(worldcup);
};

export const patchWorldcupDesc = async (id: number, desc: string) => {
  const worldcupRepository = getRepository(Worldcup);
  const worldcup = await worldcupRepository.findOne(id);
  worldcup.description = desc;
  worldcupRepository.save(worldcup);
};

export const getMetaData = async (id: number) => {
  const worldcupRepository = getRepository(Worldcup);
  const [worldcup, totalCnt] = await Promise.all([worldcupRepository.findOne(id), getCandidateTotalCnt(id)]);
  const { title, description } = worldcup;
  return { totalCnt, title, description };
};

export const removeWorldcupById = async (id: number) => {
  const worldcupRepository = getRepository(Worldcup);
  worldcupRepository.delete(id);
};
