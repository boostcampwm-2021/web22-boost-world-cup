import * as tagService from '../services/tagService';
import { NextFunction, Request, Response } from 'express';

const userController = {
  all: async (request: Request, response: Response, next: NextFunction) => {
    const users = await tagService.findTen();
    response.json(users);
  },
};

export default userController;
