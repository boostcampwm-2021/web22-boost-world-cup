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
};

export default worldcupController;
