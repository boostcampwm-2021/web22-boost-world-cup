import * as passport from 'passport';
import { NextFunction, Request, Response } from 'express';

const authController = {
  github: async (request: Request, response: Response, next: NextFunction) => {
    passport.authenticate('github');
  },

  githubCallback: async (request: Request, response: Response, next: NextFunction) => {},
};

export default authController;
