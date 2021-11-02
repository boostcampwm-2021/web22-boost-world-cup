import * as passport from 'passport';
import * as authService from '../services/authService';
import { NextFunction, Request, Response } from 'express';

const authController = {
  github: async (request: Request, response: Response, next: NextFunction) => {
    passport.authenticate('github');
  },

  githubCallback: async (request: Request, response: Response, next: NextFunction) => {
    if (request.user.nickname) {
      response.redirect(`http://localhost:3000/`);
    } else {
      response.redirect(`http://localhost:3000/signup?client_id=${request.user.providerId}`);
    }
  },

  signup: async (request: Request, response: Response, next: NextFunction) => {
    console.log(request.body);
    const { clientId: providerId, nickname, gender, age } = request.body;
    const user = await authService.findByProviderId(providerId);
    user.nickname = nickname;
    user.gender = gender;
    user.age = age;
    try {
      await authService.saveUser(user);
      response.json({
        result: 'success',
        message: null,
        data: {},
      });
    } catch (err) {
      next(err);
    }
  },
};

export default authController;
