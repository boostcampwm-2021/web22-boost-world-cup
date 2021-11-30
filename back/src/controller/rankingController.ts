import { NextFunction, Request, Response } from 'express';
import * as candidateService from '../services/candidateService';
import * as infoService from '../services/infoService';
import * as worldcupService from '../services/worldcupService';
import ApiResult from '../utils/ApiResult';

const { succeed, failed } = ApiResult;

const rankingController = {
  get: async (request: Request, response: Response, next: NextFunction) => {
    const {
      params: { id },
      query: { offset, limit, search },
    } = request;
    if (!search) {
      const candidateLists = await candidateService.findByWorldcupId(Number(offset), Number(limit), id);
      return response.json(succeed(candidateLists));
    }
    const candidateLists = await candidateService.findBySearchWord(Number(offset), Number(limit), String(search), id);
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

    winCandidate.info = winCandidate.info
      ? infoService.setInfoData(winCandidate.info, gender, age)
      : infoService.makeInfoData(gender, age);
    await Promise.all([candidateService.save(winCandidate), candidateService.save(loseCandidate)]);
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

    winCandidate.info = infoService.setInfoData(winCandidate.info, gender, age);
    await Promise.all([
      candidateService.save(winCandidate),
      candidateService.save(loseCandidate),
      worldcupService.plusTotalCnt(worldcupId),
    ]);
    response.json(succeed(null));
  },
};

export default rankingController;
