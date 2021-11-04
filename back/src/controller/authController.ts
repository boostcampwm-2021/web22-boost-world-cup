import * as authService from '../services/authService';
import { NextFunction, Request, Response } from 'express';

const authController = {
  githubCallback: async (request: Request, response: Response, next: NextFunction) => {
    request.user.nickname
      ? response.redirect(`http://localhost:3000/main`)
      : response.redirect(`http://localhost:3000/signup?client_id=${request.user.providerId}`);
  },
  kakaoCallback: async (request: Request, response: Response, next: NextFunction) => {
    request.user.nickname
      ? response.redirect(`http://localhost:3000/main`)
      : response.redirect(`http://localhost:3000/signup?client_id=${request.user.providerId}`);
  },
  googleCallback: async (request: Request, response: Response, next: NextFunction) => {
    request.user.nickname
      ? response.redirect(`http://localhost:3000/main`)
      : response.redirect(`http://localhost:3000/signup?client_id=${request.user.providerId}`);
  },
  info: async (request: Request, response: Response, next: NextFunction) => {
    let data = {};
    if (request.user) {
      const { nickname, gender, age } = request.user;
      data = { nickname, gender, age };
    }
    response.json({
      result: 'success',
      message: null,
      data,
    });
  },
  signup: async (request: Request, response: Response, next: NextFunction) => {
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
