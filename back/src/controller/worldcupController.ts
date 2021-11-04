import * as worldcupService from '../services/worldcupService';
import { NextFunction, Request, Response } from 'express';

const worldcupController = {
  all: async (request: Request, response: Response, next: NextFunction) => {
    const users = await worldcupService.findAll();
    response.json(users);
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
  
  all_b: async (request: Request, response: Response, next: NextFunction) => {
    response.header('Access-Control-Allow-Origin', '*');
    const offset = request.query.offset;
    const limit = request.query.limit;
    const search = request.query.search;
    const worldcup =
      offset && limit
        ? await worldcupService.findPart(Number(offset), Number(limit))
        : search
        ? await worldcupService.findByKeyword(String(search))
        : await worldcupService.findAll();
    response.json(worldcup);
  },
};

export default worldcupController;
