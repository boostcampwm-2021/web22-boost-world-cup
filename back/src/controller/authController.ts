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
    try {
      const user = await authService.findByProviderId(providerId);
      user.nickname = nickname;
      user.gender = gender;
      user.age = age;
      await authService.save(user);
      response.json(succeed(null));
    } catch (e) {
      response.json(failed('signup failed'));
    }
  },

  logout: async (request: Request, response: Response, next: NextFunction) => {
    try {
      request.session.destroy(() => {});
      response.clearCookie('sid');
      response.json(succeed(null));
    } catch (e) {
      response.json(failed('logout failed'));
    }
  },

  update: async (request: Request, response: Response, next: NextFunction) => {
    try {
      await authService.update(request.body);
      response.json(succeed(null));
    } catch (err) {
      response.json(failed('userInfo update failed'));
    }
  },

  leave: async (request: Request, response: Response, next: NextFunction) => {
    try {
      request.session.destroy(() => {});
      response.clearCookie('sid');
      await authService.remove(request.params.id);
      response.json(succeed(null));
    } catch (e) {
      response.json(failed('service leave failed'));
    }
  },
};

export default authController;
