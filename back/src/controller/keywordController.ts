import * as keywordService from '../services/keywordService';
import { NextFunction, Request, Response } from 'express';
import ApiResult from '../utils/ApiResult';

const { succeed, failed } = ApiResult;

const keywordController = {
  all: async (request: Request, response: Response, next: NextFunction) => {
    const keywords = await keywordService.getTopRankKeywords();
    const keywordNames = keywords.map((keyword) => keyword.name);
    response.json(succeed(keywordNames));
  },
};

export default keywordController;
