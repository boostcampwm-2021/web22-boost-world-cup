import { Candidate } from '../entity/Candidate';
import { getRepository } from 'typeorm';

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
