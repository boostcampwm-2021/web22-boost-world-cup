import { NextFunction, Request, Response } from 'express';
import * as candidateService from '../services/candidateService';
import ApiResult from '../utils/ApiResult';

const { succeed, failed } = ApiResult;

const gameController = {
  getCandidates: async (request: Request, response: Response, next: NextFunction) => {
    const {
      query: { worldcupId, round },
    } = request;
    const candidateList = await candidateService.getRandomList(Number(worldcupId), Number(round));
    response.json(succeed(candidateList));
  },
};

export default gameController;
