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
      isCompleted: false,
      worldcupId,
      title,
      round: gameRound / 2,
      currentRound: 1,
      candidateList,
      selectedCandidate: [],
      winCandidate: {},
    };
    response.cookie('gameInfo', gameInfo, cookieConfig);
    response.json({ result: 'success' });
  },

  getCandidate: async (request: Request, response: Response, next: NextFunction) => {
    const {
      cookies: {
        gameInfo: { isCompleted, worldcupId, title, round, currentRound, candidateList, winCandidate },
      },
    } = request;

    if (isCompleted) {
      response.json({
        isCompleted,
        worldcupId,
        title,
        winCandidate,
      });
      return;
    }
    candidateList.sort(() => Math.random() - 0.5);
    response.json({
      isCompleted,
      title,
      round,
      currentRound,
      candidate1: candidateList[0],
      candidate2: candidateList[1],
    });
  },

  result: async (request: Request, response: Response, next: NextFunction) => {
    const {
      body: { winId, loseId },
      cookies: { gameInfo },
    } = request;
    const newGameInfo = { ...gameInfo };

    const winCandidate = gameInfo.candidateList.find((candidate) => candidate.id === winId);

    const remainCandidateList = gameInfo.candidateList.filter(
      (candidate) => candidate.id !== winId && candidate.id !== loseId,
    );
    newGameInfo.candidateList = [...remainCandidateList];
    newGameInfo.selectedCandidate = [...gameInfo.selectedCandidate, winCandidate];

    if (newGameInfo.round === 1) {
      newGameInfo.isCompleted = true;
      newGameInfo.winCandidate = winCandidate;
      response.cookie('gameInfo', newGameInfo, cookieConfig);
      response.json({
        isCompleted: true,
        worldcupId: gameInfo.worldcupId,
        winCandidate,
        title: gameInfo.title,
      });
      return;
    }
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
    response.json({
      isCompleted: false,
      title,
      round,
      currentRound,
      candidate1: candidateList[0],
      candidate2: candidateList[1],
    });
  },
};

export default gameController;
