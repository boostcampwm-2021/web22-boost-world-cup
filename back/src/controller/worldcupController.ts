import { NextFunction, Request, Response } from 'express';
import * as worldcupService from '../services/worldcupService';
import * as commentService from '../services/commentService';
import { findById as findUserById } from '../services/userService';
import { findById as findWorldcupById } from '../services/worldcupService';
import { getCandidates } from '../services/candidateService';
import ApiResult from '../utils/ApiResult';

const { succeed, failed } = ApiResult;

const worldcupController = {
  all: async (request: Request, response: Response, next: NextFunction) => {
    const { offset, limit, search, keyword } = request.query;
    if (offset === undefined || limit === undefined)
      return response.status(400).json(failed('offset or limit is undefined'));
    if (!search && !keyword) {
      const worldcups = await worldcupService.findFromPage(Number(offset), Number(limit));
      return response.json(succeed(worldcups));
    }
    if (!keyword) {
      const worldcups = await worldcupService.findBySearchWord(Number(offset), Number(limit), search);
      return response.json(succeed(worldcups));
    }
    const worldcups = await worldcupService.findByKeyword(Number(offset), Number(limit), keyword);
    response.json(succeed(worldcups));
  },

  one: async (request: Request, response: Response, next: NextFunction) => {
    const {
      params: { id },
      query: { metaonly },
    } = request;
    if (metaonly) {
      const worldcupMetadata = await worldcupService.getMetaData(Number(id));
      return response.json(succeed(worldcupMetadata));
    }
    response.status(400).json(failed('cannot get worldcup metadata'));
  },

  save: async (request: Request, response: Response, next: NextFunction) => {
    const {
      body: { title, desc, keywords, imgInfos },
      session: {
        passport: { user },
      },
    } = request;
    try {
      await worldcupService.save(title, desc, keywords, imgInfos, user);
      response.json(succeed(null));
    } catch (e) {
      response.status(400).json(failed(e.message));
    }
  },

  deleteWorldcup: async (request: Request, response: Response, next: NextFunction) => {
    const { id } = request.params;
    try {
      await worldcupService.removeWorldcupById(Number(id));
      response.json(succeed(null));
    } catch (e) {
      response.status(400).json(failed('cannot delete worldcup'));
    }
  },

  patchTitle: async (request: Request, response: Response, next: NextFunction) => {
    const {
      body: { title },
      params: { id },
    } = request;
    try {
      await worldcupService.patchWorldcupTitle(Number(id), title);
      response.json(succeed(null));
    } catch (e) {
      response.json(failed('cannot patch worldcup title'));
    }
  },

  patchDesc: async (request: Request, response: Response, next: NextFunction) => {
    const {
      body: { desc },
      params: { id },
    } = request;
    try {
      await worldcupService.patchWorldcupDesc(Number(id), desc);
      response.json(succeed(null));
    } catch (e) {
      response.json(failed('cannot patch worldcup desc'));
    }
  },

  getCandidates: async (request: Request, response: Response, next: NextFunction) => {
    const {
      query: { offset, limit },
      params: { id },
    } = request;
    try {
      const candidates = await getCandidates(Number(id), Number(offset), Number(limit));
      response.json(succeed(candidates));
    } catch (e) {
      response.json(failed('cannot get candidates'));
    }
  },

  getComments: async (request: Request, response: Response, next: NextFunction) => {
    const {
      params: { id },
      query: { offset, limit, length },
    } = request;
    if (length) {
      const worldcup = await findWorldcupById(id);
      const comments = await commentService.getCountByWorldcupId(worldcup);
      response.json(succeed(comments));
    } else {
      const comments = await commentService.findByWorldcupId(id, offset as string, limit as string);
      response.json(succeed(comments));
    }
  },

  saveComment: async (request: Request, response: Response, next: NextFunction) => {
    const {
      params: { id },
      body: { message },
      user: { id: userId },
    } = request;
    const [user, worldcup] = await Promise.all([findUserById(userId), findWorldcupById(id)]);
    const {
      user: { nickname },
      createdAt,
      id: commentId,
    } = await commentService.save(user, worldcup, message);
    const comment = { commentId, userId, nickname, createdAt, message };
    response.json(succeed(comment));
  },

  deleteComment: async (request: Request, response: Response, next: NextFunction) => {
    const {
      params: { id },
    } = request;
    try {
      await commentService.deleteById(id);
      response.json(succeed(null));
    } catch (err) {
      next(err);
    }
  },

  getMyWorldcup: async (request: Request, response: Response, next: NextFunction) => {
    const { offset, limit } = request.query;
    const { id } = request.user;
    try {
      const worldcup = await worldcupService.findMyWorldcup(Number(offset), Number(limit), Number(id));
      response.json(succeed(worldcup));
    } catch (err) {
      response.json(failed('cannot get myWorldcup list'));
    }
  },
};

export default worldcupController;
