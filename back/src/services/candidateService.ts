import { Candidate } from '../entity/Candidate';
import { Info } from '../entity/Info';
import { getRepository } from 'typeorm';

export const getCandidateList = async (worldcupId: String) => {
  const candidateList = await getRepository(Candidate)
    .createQueryBuilder('candidate')
    .where('candidate.worldcup_id= :id', { id: worldcupId })
    .leftJoinAndSelect('candidate.info', 'info')
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

export const findOneByKey = async (candidateKey: string) => {
  const candidateRepository = getRepository(Candidate);
  return await candidateRepository.findOne({ url: `${process.env.IMG_URL_END_POINT}/${candidateKey}.webp` });
};

export const removeByKey = async (key: string) => {
  const candidateRepository = getRepository(Candidate);
  const candidateToRemove = await findOneByKey(key);
  if (!candidateToRemove) return;
  candidateRepository.remove(candidateToRemove);
};

export const save = async (imgInfos, worldcup) => {
  const candidateRepository = getRepository(Candidate);
  const InfoRepository = getRepository(Info);
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

export const getCandidates = async (worldcupId: number, offset: number, limit: number) => {
  const candidateRepository = getRepository(Candidate);
  return await candidateRepository
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
