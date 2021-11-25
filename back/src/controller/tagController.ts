import * as tagService from '../services/tagService';
import { NextFunction, Request, Response } from 'express';
import ApiResult from '../utils/ApiResult';

const { succeed, failed } = ApiResult;

const tagController = {
  all: async (request: Request, response: Response, next: NextFunction) => {
    const tags = await tagService.getTopRankTags();
    const tagNames = tags.map((tag) => tag.name);
    response.json(succeed(tagNames));
  },
};

export default tagController;
