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
