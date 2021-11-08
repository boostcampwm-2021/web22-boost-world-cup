import * as worldcupService from '../services/worldcupService';
import { NextFunction, Request, Response } from 'express';

const worldcupController = {
  all: async (request: Request, response: Response, next: NextFunction) => {
    const { offset, limit, search } = request.query;
    let data = [];
    if (offset && limit) {
      const worldcups = await worldcupService.findFromPage(offset, limit);
      data = worldcups.data.worldcup;
    }
    response.json({
      result: 'success',
      message: null,
      data,
    });
  },

  one: async (request: Request, response: Response, next: NextFunction) => {
    return await worldcupService.findById(request.params.id);
  },

  save: async (request: Request, response: Response, next: NextFunction) => {
    return await worldcupService.save(request.body);
  },

  remove: async (request: Request, response: Response, next: NextFunction) => {
    return await worldcupService.removeById(request.params.id);
  },
};

export default worldcupController;
