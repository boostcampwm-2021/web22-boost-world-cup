import { NextFunction, Request, Response } from 'express';
import * as candidateService from '../services/candidateService';

const cookieConfig = {
  httpOnly: true,
  maxAge: 1000 * 60 * 60,
  signed: true,
};

const gameController = {
  start: async (request: Request, response: Response, next: NextFunction) => {
    const { worldcupId, round } = request.body;
    const gameRound = 2 ** (round + 2);
    const candidateList = await candidateService.getRandomCandidateList(worldcupId, gameRound);

    if (request.cookies.gameInfo) {
      response.clearCookie('gameInfo');
    }
    const gameInfo = {
      round: 16,
      currentRound: 1,
      candidateList,
      selectedCandidate: [],
    };
    response.cookie('gameInfo', gameInfo, cookieConfig);
    response.json({ result: 'success' });
  },
};

export default gameController;
