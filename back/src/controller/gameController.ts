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
      round: gameRound / 2,
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

  result: async (request: Request, response: Response, next: NextFunction) => {
    const {
      body: { winId, loseId },
      cookies: { gameInfo },
    } = request;
    const newGameInfo = { ...gameInfo };

    const remainCandidateList = gameInfo.candidateList.filter(
      (candidate) => candidate.id !== winId && candidate.id !== loseId,
    );
    const winCandidate = gameInfo.candidateList.find((candidate) => candidate.id === winId);

    newGameInfo.candidateList = [...remainCandidateList];
    newGameInfo.selectedCandidate = [...gameInfo.selectedCandidate, winCandidate];

    if (newGameInfo.currentRound === newGameInfo.round) {
      newGameInfo.round = newGameInfo.round / 2;
      newGameInfo.currentRound = 1;
      newGameInfo.candidateList = [...newGameInfo.selectedCandidate];
      newGameInfo.selectedCandidate = [];
    } else {
      newGameInfo.currentRound = gameInfo.currentRound + 1;
    }
    response.cookie('gameInfo', newGameInfo, cookieConfig);
    newGameInfo.candidateList.sort(() => Math.random() - 0.5);
    const { title, round, currentRound, candidateList } = newGameInfo;
    response.json({ title, round, currentRound, candidate1: candidateList[0], candidate2: candidateList[1] });
  },
};

export default gameController;
