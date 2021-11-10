import * as worldcupService from '../services/worldcupService';
import { NextFunction, Request, Response } from 'express';

const worldcupController = {
  all: async (request: Request, response: Response, next: NextFunction) => {
    const { offset, limit, search, keyword } = request.query;
    let worldcups;
    if (!search && !keyword) {
      worldcups = await worldcupService.findFromPage(offset, limit);
    } else if (!keyword) {
      worldcups = await worldcupService.findBySearchWord(offset, limit, search);
    } else {
      worldcups = await worldcupService.findByKeyword(offset, limit, keyword);

    }
    response.json({
      result: 'success',
      message: null,
      data: {
        worldcup: worldcups,
      },
    });
  },

  one: async (request: Request, response: Response, next: NextFunction) => {
    const worldcup = await worldcupService.findById(request.params.id);
    response.json({
      result: 'success',
      message: null,
      data: {
        worldcup,
      },
    });

  },

  save: async (request: Request, response: Response, next: NextFunction) => {
    return await worldcupService.save(request.body);
  },

  remove: async (request: Request, response: Response, next: NextFunction) => {
    return await worldcupService.removeById(request.params.id);
  },
};

export default worldcupController;
