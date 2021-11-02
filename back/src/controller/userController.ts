import * as userService from '../services/userService';
import { NextFunction, Request, Response } from 'express';

const userController = {
  all: async (request: Request, response: Response, next: NextFunction) => {
    const users = await userService.findAll();
    response.json(users);
  },

  one: async (request: Request, response: Response, next: NextFunction) => {
    return await userService.findById(request.params.id);
  },

  save: async (request: Request, response: Response, next: NextFunction) => {
    return await userService.save(request.body);
  },

  remove: async (request: Request, response: Response, next: NextFunction) => {
    return await userService.removeById(request.params.id);
  },
};

export default userController;
