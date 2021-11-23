import 'dotenv/config';
import * as authService from '../services/authService';
import { NextFunction, Request, Response } from 'express';

const authController = {
  setCookie: async (request: Request, response: Response, next: NextFunction) => {
    const { redirect_url: redirectUrl } = request.query;
    redirectUrl && response.cookie('redirectUrl', redirectUrl);
    next();
  },

  githubCallback: async (request: Request, response: Response, next: NextFunction) => {
    const {
      cookies: { redirectUrl },
    } = request;
    request.user.nickname
      ? redirectUrl
        ? response.redirect(`${process.env.REDIRECT_URL}${redirectUrl}`)
        : response.redirect(`${process.env.REDIRECT_URL}/main`)
      : response.redirect(`${process.env.REDIRECT_URL}/signup?client_id=${request.user.providerId}`);
  },
  kakaoCallback: async (request: Request, response: Response, next: NextFunction) => {
    const {
      cookies: { redirectUrl },
    } = request;
    request.user.nickname
      ? redirectUrl
        ? response.redirect(`${process.env.REDIRECT_URL}${redirectUrl}`)
        : response.redirect(`${process.env.REDIRECT_URL}/main`)
      : response.redirect(`${process.env.REDIRECT_URL}/signup?client_id=${request.user.providerId}`);
  },
  googleCallback: async (request: Request, response: Response, next: NextFunction) => {
    const {
      cookies: { redirectUrl },
    } = request;
    request.user.nickname
      ? redirectUrl
        ? response.redirect(`${process.env.REDIRECT_URL}${redirectUrl}`)
        : response.redirect(`${process.env.REDIRECT_URL}/main`)
      : response.redirect(`${process.env.REDIRECT_URL}/signup?client_id=${request.user.providerId}`);
  },
  info: async (request: Request, response: Response, next: NextFunction) => {
    let data = {};
    if (request.user) {
      const { id, nickname, gender, age } = request.user;
      data = { id, nickname, gender, age };
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
  logout: async (request: Request, response: Response, next: NextFunction) => {
    try {
      request.session.destroy(() => {});
      response.clearCookie('sid');
      response.json({
        result: 'success',
        message: null,
      });
    } catch (err) {
      next(err);
    }
  },
  update: async (request: Request, response: Response, next: NextFunction) => {
    try {
      await authService.updateUser(request.body);
      return response.json({
        result: 'success',
        message: null,
      });
    } catch (err) {
      next(err);
    }
  },
  leave: async (request: Request, response: Response, next: NextFunction) => {
    try {
      await authService.removeUser(request.params.id);
      request.session.destroy(() => {});
      response.clearCookie('sid');
      response.json({
        result: 'success',
        message: null,
      });
    } catch (err) {
      next(err);
    }
  },
};

export default authController;
