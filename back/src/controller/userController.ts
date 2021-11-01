import * as userService from '../services/userService';
import { NextFunction, Request, Response } from 'express';

export class UserController {
  async all(request: Request, response: Response, next: NextFunction) {
    return await userService.findAll();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    return userService.findById(request.params.id);
  }

  async save(request: Request, response: Response, next: NextFunction) {
    return userService.save(request.body);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    return userService.removeById(request.params.id);
  }
}
