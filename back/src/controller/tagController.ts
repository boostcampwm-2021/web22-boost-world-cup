import * as keywordService from '../services/keywordService';
import { NextFunction, Request, Response } from 'express';
import ApiResult from '../utils/ApiResult';

const { succeed, failed } = ApiResult;

const tagController = {
  all: async (request: Request, response: Response, next: NextFunction) => {
    const tags = await keywordService.getTopRankKeywords();
    const tagNames = tags.map((tag) => tag.name);
    response.json(succeed(tagNames));
  },
};

export default tagController;
