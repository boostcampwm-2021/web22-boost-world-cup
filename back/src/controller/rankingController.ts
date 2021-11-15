import { NextFunction, Request, Response } from 'express';
import { Info } from '../entity/Info';
import * as candidateService from '../services/candidateService';

export enum GENDER {
  MALE = 1,
  FEMALE,
}
export enum AGE {
  TEENS = 1,
  TWENTIES,
  THIRTIES,
  FORTIES,
  ETC,
}

const rankingController = {
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
      winCandidate.info = new Info();
      switch (gender) {
        case GENDER.MALE:
          winCandidate.info.male = 1;
          break;
        case GENDER.FEMALE:
          winCandidate.info.female = 1;
          break;
        default:
          break;
      }
      switch (age) {
        case AGE.TEENS:
          winCandidate.info.teens = 1;
          break;
        case 2:
          winCandidate.info.twenties = 1;
          break;
        case 3:
          winCandidate.info.thirties = 1;
          break;
        case 4:
          winCandidate.info.forties = 1;
          break;
        case 5:
          winCandidate.info.etc = 1;
          break;
        default:
          break;
      }
      winCandidate.info.total = 1;
    } else {
      switch (age) {
        case 1:
          winCandidate.info.teens += 1;
          break;
        case 2:
          winCandidate.info.twenties += 1;
          break;
        case 3:
          winCandidate.info.thirties += 1;
          break;
        case 4:
          winCandidate.info.forties += 1;
          break;
        case 5:
          winCandidate.info.etc += 1;
          break;
        default:
          break;
      }
      switch (gender) {
        case 1:
          winCandidate.info.male += 1;
          break;
        case 2:
          winCandidate.info.female += 1;
          break;
        default:
          break;
      }
      winCandidate.info.total += 1;
    }
    await candidateService.saveCandidate(winCandidate);
    await candidateService.saveCandidate(loseCandidate);
    response.json({ result: 'success' });
  },
};

export default rankingController;
