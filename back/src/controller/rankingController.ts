import { NextFunction, Request, Response } from 'express';
import * as candidateService from '../services/candidateService';
import { makeInfoData, setInfoData } from '../services/infoService';
import { plusTotalCnt } from '../services/worldcupService';

const rankingController = {
  getRankingInfo: async (request: Request, response: Response, next: NextFunction) => {
    const {
      params: { id },
    } = request;
    const candidateLists = await candidateService.getCandidatesByWorldcup(id);
    response.json({ candidateLists });
  },
  saveCurrentResult: async (request: Request, response: Response, next: NextFunction) => {
    const {
      body: { winId, loseId },
      user: { gender, age },
    } = request;

    const winCandidate = await candidateService.findOneWithInfoById(winId);
    const loseCandidate = await candidateService.findOneById(loseId);

    winCandidate.showCnt += 1;
    winCandidate.winCnt += 1;
    loseCandidate.showCnt += 1;

    if (!winCandidate.info) {
      winCandidate.info = makeInfoData(gender, age);
    } else {
      winCandidate.info = setInfoData(winCandidate.info, gender, age);
    }
    await candidateService.saveCandidate(winCandidate);
    await candidateService.saveCandidate(loseCandidate);
    response.json({ result: 'success' });
  },
  saveFinalResult: async (request: Request, response: Response, next: NextFunction) => {
    const {
      body: { worldcupId, winId, loseId },
      user: { gender, age },
    } = request;

    const winCandidate = await candidateService.findOneWithInfoById(winId);
    const loseCandidate = await candidateService.findOneById(loseId);

    winCandidate.showCnt += 1;
    winCandidate.winCnt += 1;
    winCandidate.victoryCnt += 1;
    loseCandidate.showCnt += 1;

    winCandidate.info = setInfoData(winCandidate.info, gender, age);
    await candidateService.saveCandidate(winCandidate);
    await candidateService.saveCandidate(loseCandidate);
    await plusTotalCnt(worldcupId);
    response.json({ result: 'success' });
  },
};

export default rankingController;
