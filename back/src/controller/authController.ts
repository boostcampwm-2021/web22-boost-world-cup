import * as passport from 'passport';
import { NextFunction, Request, Response } from 'express';

const authController = {
  github: async (request: Request, response: Response, next: NextFunction) => {
    passport.authenticate('github');
  },

  githubCallback: async (request: Request, response: Response, next: NextFunction) => {
    if (request.user.nickname) {
      response.redirect(`http://localhost:3000/`);
    } else {
      response.redirect(`http://localhost:3000/signup?client_id=${request.user.id}`);
    }
  },
};

export default authController;
