import * as worldcupService from '../services/worldcupService';
import { NextFunction, Request, Response } from 'express';

const worldcupController = {
  all: async (request: Request, response: Response, next: NextFunction) => {
    const { offset, limit, search } = request.query;
    let worldcups;
    if (offset && limit) {
      worldcups = await worldcupService.findFromPage(offset, limit);
    }
    if (search) {
      worldcups = await worldcupService.findByKeyword(String(search));
    }
    response.json(worldcups);
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
