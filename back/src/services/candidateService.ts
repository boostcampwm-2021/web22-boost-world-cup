import { Candidate } from '../entity/Candidate';
import { Worldcup } from '../entity/Worldcup';
import { Info } from '../entity/Info';
import { getRepository, Repository } from 'typeorm';
import * as infoService from './infoService';

export const findByWorldcupId = (offset: number, limit: number, worldcupId: String) => {
  return getRepository(Candidate)
    .createQueryBuilder('candidate')
    .leftJoinAndSelect('candidate.worldcup', 'worldcup')
    .leftJoinAndSelect('candidate.info', 'info')
    .where('candidate.worldcup_id= :id', { id: worldcupId })
    .select([
      'candidate.id AS id',
      'candidate.name AS name',
      'candidate.img_key AS imgKey',
      'candidate.win_cnt / candidate.show_cnt AS winRatio',
      'candidate.victory_cnt /  worldcup.total_cnt AS victoryRatio',
      'info.male / (info.male + info.female) AS male',
      'info.female / (info.male + info.female) AS female',
      'info.teens / (info.teens+info.twenties+info.thirties+info.forties+info.fifties+info.etc) AS teens',
      'info.twenties / (info.teens+info.twenties+info.thirties+info.forties+info.fifties+info.etc) AS twenties',
      'info.thirties / (info.teens+info.twenties+info.thirties+info.forties+info.fifties+info.etc) AS thirties',
      'info.forties / (info.teens+info.twenties+info.thirties+info.forties+info.fifties+info.etc) AS forties',
      'info.fifties / (info.teens+info.twenties+info.thirties+info.forties+info.fifties+info.etc) AS fifties',
      'info.etc / (info.teens+info.twenties+info.thirties+info.forties+info.fifties+info.etc) AS etc',
    ])
    .orderBy('candidate.victory_cnt /  worldcup.total_cnt', 'DESC')
    .addOrderBy('candidate.win_cnt / candidate.show_cnt', 'DESC')
    .offset(offset)
    .limit(limit)
    .execute();
};

export const findBySearchWord = (offset: number, limit: number, search: String, worldcupId: String) => {
  return getRepository(Candidate)
    .createQueryBuilder('candidate')
    .leftJoinAndSelect('candidate.worldcup', 'worldcup')
    .leftJoinAndSelect('candidate.info', 'info')
    .where('candidate.worldcup_id= :id', { id: worldcupId })
    .andWhere('candidate.name like :name', { name: `%${search}%` })
    .select([
      'candidate.id AS id',
      'candidate.name AS name',
      'candidate.img_key AS imgKey',
      'candidate.win_cnt / candidate.show_cnt AS winRatio',
      'candidate.victory_cnt /  worldcup.total_cnt AS victoryRatio',
      'info.male / (info.male + info.female) AS male',
      'info.female / (info.male + info.female) AS female',
      'info.teens / (info.teens+info.twenties+info.thirties+info.forties+info.fifties+info.etc) AS teens',
      'info.twenties / (info.teens+info.twenties+info.thirties+info.forties+info.fifties+info.etc) AS twenties',
      'info.thirties / (info.teens+info.twenties+info.thirties+info.forties+info.fifties+info.etc) AS thirties',
      'info.forties / (info.teens+info.twenties+info.thirties+info.forties+info.fifties+info.etc) AS forties',
      'info.fifties / (info.teens+info.twenties+info.thirties+info.forties+info.fifties+info.etc) AS fifties',
      'info.etc / (info.teens+info.twenties+info.thirties+info.forties+info.fifties+info.etc) AS etc',
    ])
    .orderBy('candidate.victory_cnt /  worldcup.total_cnt', 'DESC')
    .offset(offset)
    .limit(limit)
    .execute();
};

export const getRandomList = (worldcupId: number, round: number) => {
  return getRepository(Candidate)
    .createQueryBuilder('candidate')
    .select(['id', 'name', 'img_key AS imgKey'])
    .where('candidate.worldcup_id= :id', { id: worldcupId })
    .orderBy('RAND()')
    .limit(round)
    .execute();
};

export const findOneWithInfoById = (id: number) => {
  return getRepository(Candidate).findOne(id, { relations: ['info'] });
};

export const findOneById = async (id: number) => {
  const candidateRepository = getRepository(Candidate);
  return await candidateRepository.findOne(id);
};

export const save = async (candidate: Candidate) => {
  const candidateRepository = getRepository(Candidate);
  return await candidateRepository.save(candidate);
};

export const findOneByKey = (candidateKey: string) => {
  const candidateRepository = getRepository(Candidate);
  return candidateRepository.findOne({ imgKey: candidateKey });
};

export const removeByKey = async (key: string) => {
  const candidateRepository = getRepository(Candidate);
  const candidateToRemove = await findOneByKey(key);
  if (!candidateToRemove) return;
  await infoService.removeByCandidateId(candidateToRemove.id);
  return candidateRepository.remove(candidateToRemove);
};

export const saveWithInfo = async (imgInfos, worldcupId) => {
  const worldcupRepository = getRepository(Worldcup);
  const candidateRepository = getRepository(Candidate);
  const InfoRepository = getRepository(Info);

  const worldcup = await worldcupRepository.findOne(worldcupId);

  const candidates = await Promise.all(
    imgInfos.map(async ({ key, name }) => {
      const info = InfoRepository.create();
      await InfoRepository.save(info);
      return candidateRepository.create({
        imgKey: key,
        worldcup,
        name,
        info,
      });
    }),
  );
  return candidateRepository.save(candidates);
};

export const patchCandidate = async (key: string, name: string, newKey?: string) => {
  const candidateRepository = getRepository(Candidate);
  const candidate = await findOneByKey(key);
  if (!candidate) return;
  candidate.name = name;
  if (newKey) candidate.imgKey = newKey;
  return candidateRepository.save(candidate);
};

export const getCandidates = (worldcupId: number, offset: number, limit: number) => {
  return getRepository(Candidate)
    .createQueryBuilder('candidate')
    .select()
    .leftJoin('candidate.worldcup', 'worldcup')
    .where('worldcup.id = :id', { id: worldcupId })
    .offset(offset)
    .limit(limit)
    .getMany();
};

export const getTotalCount = (worldcupId: number) => {
  return getRepository(Candidate)
    .createQueryBuilder('candidate')
    .leftJoin('candidate.worldcup', 'worldcup')
    .where('worldcup.id = :id', { id: worldcupId })
    .getCount();
};

export const getTotalCountBySearchhWord = (worldcupId: number, searchWord: String) => {
  return getRepository(Candidate)
    .createQueryBuilder('candidate')
    .leftJoin('candidate.worldcup', 'worldcup')
    .where('worldcup.id = :id', { id: worldcupId })
    .andWhere('candidate.name like :name', { name: `%${searchWord}%` })
    .getCount();
};
