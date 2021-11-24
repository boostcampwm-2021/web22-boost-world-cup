import { Candidate } from '../entity/Candidate';
import { Worldcup } from '../entity/Worldcup';
import { Info } from '../entity/Info';
import { getRepository } from 'typeorm';
import { removeByCandidateId as removeInfoByCandidateId } from './infoService';

export const getCandidatesByWorldcup = async (offset: number, limit: number, worldcupId: String) => {
  const candidateList = await getRepository(Candidate)
    .createQueryBuilder('candidate')
    .leftJoinAndSelect('candidate.worldcup', 'worldcup')
    .leftJoinAndSelect('candidate.info', 'info')
    .where('candidate.worldcup_id= :id', { id: worldcupId })
    .select([
      'candidate.id AS id',
      'candidate.name AS name',
      'candidate.url AS url',
      'worldcup.total_cnt AS total',
      'candidate.show_cnt AS showCnt',
      'candidate.win_cnt AS winCnt',
      'candidate.victory_cnt AS victoryCnt',
      'info.male AS male',
      'info.female AS female',
      'info.teens AS teens',
      'info.twenties AS twenties',
      'info.thirties AS thirties',
      'info.forties AS forties',
      'info.fifties AS fifties',
      'info.etc AS etc',
    ])
    .offset(offset)
    .limit(limit)
    .execute();
  return candidateList;
};
export const getRandomCandidateList = async (worldcupId: number, round: number) => {
  const randomCandidateList = await getRepository(Candidate)
    .createQueryBuilder('candidate')
    .select(['id', 'name', 'url'])
    .where('candidate.worldcup_id= :id', { id: worldcupId })
    .orderBy('RAND()')
    .limit(round)
    .execute();
  return randomCandidateList;
};

export const findOneWithInfoById = async (id: number) => {
  const candidateRepository = getRepository(Candidate);
  return await candidateRepository.findOne(id, { relations: ['info'] });
};

export const findOneById = async (id: number) => {
  const candidateRepository = getRepository(Candidate);
  return await candidateRepository.findOne(id);
};

export const saveCandidate = async (candidate: Candidate) => {
  const candidateRepository = getRepository(Candidate);
  return await candidateRepository.save(candidate);
};

export const findOneByKey = (candidateKey: string) => {
  const candidateRepository = getRepository(Candidate);
  return candidateRepository.findOne({ url: `${process.env.IMG_URL_END_POINT}/${candidateKey}.webp` });
};

export const removeByKey = async (key: string) => {
  const candidateRepository = getRepository(Candidate);
  const candidateToRemove = await findOneByKey(key);
  if (!candidateToRemove) return;
  await removeInfoByCandidateId(candidateToRemove.id);
  return candidateRepository.remove(candidateToRemove);
};

export const save = async (imgInfos, worldcupId) => {
  const worldcupRepository = getRepository(Worldcup);
  const candidateRepository = getRepository(Candidate);
  const InfoRepository = getRepository(Info);

  const worldcup = await worldcupRepository.findOne(worldcupId);

  const candidates = await Promise.all(
    imgInfos.map(async ({ key, name }) => {
      const info = InfoRepository.create();
      await InfoRepository.save(info);
      return candidateRepository.create({
        url: `${process.env.IMG_URL_END_POINT}/${key}.webp`,
        worldcup,
        name,
        info,
      });
    }),
  );

  return await candidateRepository.save(candidates);
};

export const patchCandidate = async (key: string, name: string, newKey?: string) => {
  const candidateRepository = getRepository(Candidate);
  const candidate = await findOneByKey(key);
  if (!candidate) return;
  candidate.name = name;
  if (newKey) candidate.url = `${process.env.IMG_URL_END_POINT}/${newKey}.webp`;
  return candidateRepository.save(candidate);
};

export const getCandidates = (worldcupId: number, offset: number, limit: number) => {
  const candidateRepository = getRepository(Candidate);
  return candidateRepository
    .createQueryBuilder('candidate')
    .select(['candidate.id AS id', 'candidate.name AS name', 'candidate.url AS url'])
    .leftJoin('candidate.worldcup', 'worldcup')
    .where('worldcup.id = :id', { id: worldcupId })
    .offset(offset)
    .limit(limit)
    .execute();
};

export const getTotalCount = (worldcupId: number) => {
  const candidateRepository = getRepository(Candidate);
  return candidateRepository
    .createQueryBuilder('candidate')
    .leftJoin('candidate.worldcup', 'worldcup')
    .where('worldcup.id = :id', { id: worldcupId })
    .getCount();
};
