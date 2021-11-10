import { Candidate } from '../entity/Candidate';
import { getRepository } from 'typeorm';

export const getRandomCandidateList = async (worldcupId: number, round: number) => {
  const randomCandidateList = await getRepository(Candidate)
    .createQueryBuilder('candidate')
    .select(['id', 'name', 'url'])
    .orderBy('RAND()')
    .limit(round)
    .execute();
  return randomCandidateList;
};

export const findOneByKey = async (candidateKey: string) => {
  const candidateRepository = getRepository(Candidate);
  return await candidateRepository.findOne({ key: candidateKey });
};

export const removeByKey = async (key: string) => {
  const candidateRepository = getRepository(Candidate);
  const candidateToRemove = await findOneByKey(key);
  if (!candidateToRemove) return;
  candidateRepository.remove(candidateToRemove);
};
