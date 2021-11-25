import { Worldcup } from '../entity/Worldcup';
import { findOrCreate as findOrCreateTag } from './tagService';
import {
  save as saveCandidates,
  getTotalCount as getCandidateTotalCnt,
  getTotalCountBySearchhWord as getCandidateTotalCntBySearchWord,
} from './candidateService';
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

export const findMyWorldcup = async (offset: number, limit: number, id: number): Promise<Worldcup[]> => {
  const worldcupRepository: Repository<Worldcup> = getRepository(Worldcup);
  return await worldcupRepository
    .createQueryBuilder('worldcup')
    .where('worldcup.user_id = :id', { id: id })
    .skip(offset)
    .take(limit)
    .getMany();
};

export const findById = async (id) => {
  const worldcupRepository = getRepository(Worldcup);
  return await worldcupRepository.findOne(id, { relations: ['candidates'] });
};

export const save = async (title: string, description: string, keywordNames: string[], imgInfos, userId: number) => {
  const worldcupRepository: Repository<Worldcup> = getRepository(Worldcup);

  const [keywords, user] = await Promise.all([
    Promise.all(keywordNames.map((name: string) => findOrCreateTag(name))),
    findUserById(userId),
  ]);
  const [thumbnail1, thumbnail2] = imgInfos
    .slice(0, 2)
    .map(({ key }) => `${process.env.IMG_URL_END_POINT}/${key}.webp`);

  const { id } = await worldcupRepository.save({
    title,
    thumbnail1,
    thumbnail2,
    description,
    keywords,
    user,
  });

  await saveCandidates(imgInfos, id);
};

export const plusTotalCnt = async (id: number) => {
  const worldcupRepository = getRepository(Worldcup);
  const worldcup = await worldcupRepository.findOne(id);
  worldcup.totalCnt += 1;
  return await worldcupRepository.save(worldcup);
};

export const patchWorldcupTitle = async (id: number, title: string) => {
  const worldcupRepository: Repository<Worldcup> = getRepository(Worldcup);
  return await worldcupRepository
    .createQueryBuilder('worldcup')
    .update(Worldcup)
    .set({ title: title })
    .where('worldcup.id = :id', { id: id })
    .execute();
};

export const patchWorldcupDesc = async (id: number, desc: string) => {
  const worldcupRepository: Repository<Worldcup> = getRepository(Worldcup);
  return await worldcupRepository
    .createQueryBuilder('worldcup')
    .update(Worldcup)
    .set({ description: desc })
    .where('worldcup.id = :id', { id: id })
    .execute();
};

export const getMetaData = async (id: number, searchWord?: String) => {
  const worldcupRepository: Repository<Worldcup> = getRepository(Worldcup);
  const [worldcup, totalCnt] = await Promise.all([
    worldcupRepository.findOne(id),
    searchWord ? getCandidateTotalCntBySearchWord(id, searchWord) : getCandidateTotalCnt(id),
  ]);
  const { title, description } = worldcup;
  return { totalCnt, title, description };
};

export const removeWorldcupById = async (id: number) => {
  const worldcupRepository = getRepository(Worldcup);
  worldcupRepository.delete(id);
};
