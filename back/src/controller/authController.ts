import 'dotenv/config';
import * as authService from '../services/authService';
import { NextFunction, Request, Response } from 'express';
import ApiResult from '../utils/ApiResult';

const { succeed, failed } = ApiResult;

const authController = {
  setCookie: async (request: Request, response: Response, next: NextFunction) => {
    const { redirect_url: redirectUrl } = request.query;
    response.cookie('redirectUrl', redirectUrl);
    next();
  },

  oauthCallback: async (request: Request, response: Response) => {
    const {
      cookies: { redirectUrl },
    } = request;
    response.clearCookie('redirectUrl');
    request.user.nickname
      ? response.redirect(`${process.env.REDIRECT_URL}${redirectUrl}`)
      : response.redirect(`${process.env.REDIRECT_URL}/signup?client_id=${request.user.providerId}`);
  },

  info: async (request: Request, response: Response, next: NextFunction) => {
    if (!request.user) return response.status(401).json(failed('login failed'));
    const { id, nickname, gender, age } = request.user;
    const userInfo = { id, nickname, gender, age };
    response.json(succeed(userInfo));
  },

  signup: async (request: Request, response: Response, next: NextFunction) => {
    const { clientId: providerId, nickname, gender, age } = request.body;
    const user = await authService.findByProviderId(providerId);
    user.nickname = nickname;
    user.gender = gender;
    user.age = age;
    try {
      await authService.saveUser(user);
      response.json(succeed(null));
    } catch (err) {
      next(err);
    }
  },

  logout: async (request: Request, response: Response, next: NextFunction) => {
    try {
      request.session.destroy(() => {});
      response.clearCookie('sid');
      response.json(succeed(null));
    } catch (err) {
      next(err);
    }
  },

  update: async (request: Request, response: Response, next: NextFunction) => {
    try {
      await authService.updateUser(request.body);
      return response.json(succeed(null));
    } catch (err) {
      next(err);
    }
  },

  leave: async (request: Request, response: Response, next: NextFunction) => {
    request.session.destroy(() => {});
    response.clearCookie('sid');
    await authService.removeUser(request.params.id);
    response.json(succeed(null));
  },
};

export default authController;
