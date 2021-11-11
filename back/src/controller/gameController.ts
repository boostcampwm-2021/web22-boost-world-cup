import { NextFunction, Request, Response } from 'express';
import * as candidateService from '../services/candidateService';
import * as worldcupService from '../services/worldcupService';

import cookieConfig from '../config/cookie';

const gameController = {
  getCandidates: async (request: Request, response: Response, next: NextFunction) => {
    const {
      query: { worldcupId, round },
    } = request;
    const candidateList = await candidateService.getRandomCandidateList(Number(worldcupId), Number(round));
    response.json(candidateList);
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
