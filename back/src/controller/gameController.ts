import { NextFunction, Request, Response } from 'express';
import * as candidateService from '../services/candidateService';
import * as worldcupService from '../services/worldcupService';

import cookieConfig from '../config/cookie';

const gameController = {
  start: async (request: Request, response: Response, next: NextFunction) => {
    const { worldcupId, round } = request.body;
    const gameRound = 2 ** (round + 2);
    const candidateList = await candidateService.getRandomCandidateList(worldcupId, gameRound);
    const title = await worldcupService.getWorldcupTitle(worldcupId);
    if (request.cookies.gameInfo) {
      response.clearCookie('gameInfo');
    }
    const gameInfo = {
      title,
      round: gameRound,
      currentRound: 1,
      candidateList,
      selectedCandidate: [],
    };
    response.cookie('gameInfo', gameInfo, cookieConfig);
    response.json({ result: 'success' });
  },
  getCandidate: async (request: Request, response: Response, next: NextFunction) => {
    const {
      cookies: {
        gameInfo: { title, round, currentRound, candidateList },
      },
    } = request;
    candidateList.sort(() => Math.random() - 0.5);
    response.json({ title, round, currentRound, candidate1: candidateList[0], candidate2: candidateList[1] });
  },
};

export default gameController;
