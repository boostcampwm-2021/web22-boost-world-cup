import { NextFunction, Request, Response } from 'express';
import * as candidateService from '../services/candidateService';

const gameController = {
  getCandidates: async (request: Request, response: Response, next: NextFunction) => {
    const {
      query: { worldcupId, round },
    } = request;
    const candidateList = await candidateService.getRandomCandidateList(Number(worldcupId), Number(round));
    response.json(candidateList);
  },
};

export default gameController;
