import { NextFunction, Request, Response } from 'express';

export class AuthController {
  async githubCallback(request: Request, response: Response, next: NextFunction) {
    console.log('Here');
    response.send('Here');
  }
}
