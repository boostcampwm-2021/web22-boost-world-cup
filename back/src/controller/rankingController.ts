import { NextFunction, Request, Response } from 'express';
import * as candidateService from '../services/candidateService';
import { makeInfoData, setInfoData } from '../services/infoService';
import { plusTotalCnt } from '../services/worldcupService';
import ApiResult from '../utils/ApiResult';

const { succeed, failed } = ApiResult;

const rankingController = {
  getRankingInfo: async (request: Request, response: Response, next: NextFunction) => {
    const {
      params: { id },
      query: { offset, limit, search },
    } = request;
    if (!search) {
      const candidateLists = await candidateService.getCandidatesByWorldcup(Number(offset), Number(limit), id);
      response.json(succeed(candidateLists));
    }
    const candidateLists = await candidateService.getCandidatesBySearchWord(
      Number(offset),
      Number(limit),
      String(search),
      id,
    );
    response.json(succeed(candidateLists));
  },

  saveCurrentResult: async (request: Request, response: Response, next: NextFunction) => {
    const {
      body: { winId, loseId },
      user: { gender, age },
    } = request;

    const [winCandidate, loseCandidate] = await Promise.all([
      candidateService.findOneWithInfoById(winId),
      candidateService.findOneById(loseId),
    ]);

    winCandidate.showCnt += 1;
    winCandidate.winCnt += 1;
    loseCandidate.showCnt += 1;

    winCandidate.info = winCandidate.info ? setInfoData(winCandidate.info, gender, age) : makeInfoData(gender, age);
    await Promise.all([candidateService.saveCandidate(winCandidate), candidateService.saveCandidate(loseCandidate)]);
    response.json(succeed(null));
  },

  saveFinalResult: async (request: Request, response: Response, next: NextFunction) => {
    const {
      body: { worldcupId, winId, loseId },
      user: { gender, age },
    } = request;

    const [winCandidate, loseCandidate] = await Promise.all([
      candidateService.findOneWithInfoById(winId),
      candidateService.findOneById(loseId),
    ]);

    winCandidate.showCnt += 1;
    winCandidate.winCnt += 1;
    winCandidate.victoryCnt += 1;
    loseCandidate.showCnt += 1;

    winCandidate.info = setInfoData(winCandidate.info, gender, age);
    await Promise.all([
      candidateService.saveCandidate(winCandidate),
      candidateService.saveCandidate(loseCandidate),
      plusTotalCnt(worldcupId),
    ]);
    response.json(succeed(null));
  },
};

export default rankingController;
