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
    if (offset === undefined || limit === undefined) {
      response.status(400).json(failed('offset or limit is undefined'));
      return;
    }
    let data;
    if (!search && !keyword) {
      data = await worldcupService.findFromPage(Number(offset), Number(limit));
    } else if (!keyword) {
      data = await worldcupService.findBySearchWord(Number(offset), Number(limit), search);
    } else {
      data = await worldcupService.findByKeyword(Number(offset), Number(limit), keyword);
    }
    response.json(succeed(data));
  },

  one: async (request: Request, response: Response, next: NextFunction) => {
    const {
      params: { id },
      query: { metaonly },
    } = request;
    if (metaonly) {
      const metadata = await worldcupService.getMetaData(Number(id));
      return response.json(metadata);
    }
    response.end();
  },

  save: async (request: Request, response: Response, next: NextFunction) => {
    const {
      body: { title, desc, keywords, imgInfos },
      session: {
        passport: { user },
      },
    } = request;
    await worldcupService.save(title, desc, keywords, imgInfos, user);
    response.json(succeed(null));
  },

  remove: async (request: Request, response: Response, next: NextFunction) => {
    const { id } = request.params;
    await worldcupService.removeWorldcupById(Number(id));
    response.json(succeed(null));
  },

  patchTitle: async (request: Request, response: Response, next: NextFunction) => {
    const { title } = request.body;
    const { id } = request.params;
    await worldcupService.patchWorldcupTitle(Number(id), title);
    response.json(succeed(null));
  },

  patchDesc: async (request: Request, response: Response, next: NextFunction) => {
    const { desc } = request.body;
    const { id } = request.params;
    await worldcupService.patchWorldcupDesc(Number(id), desc);
    response.json(succeed(null));
  },

  getCandidates: async (request: Request, response: Response, next: NextFunction) => {
    const { offset, limit } = request.query;
    const { id } = request.params;
    const candidates = await getCandidates(Number(id), Number(offset), Number(limit));
    response.json(candidates);
  },

  getComments: async (request: Request, response: Response, next: NextFunction) => {
    const {
      params: { id },
      query: { offset, limit, length },
    } = request;
    if (length) {
      const worldcup = await findWorldcupById(id);
      response.json(await commentService.getCountByWorldcupId(worldcup));
    } else {
      const comments = await commentService.findByWorldcupId(id, offset as string, limit as string);
      response.json(comments);
    }
  },

  saveComment: async (request: Request, response: Response, next: NextFunction) => {
    const {
      params: { id },
      body: { message },
      user: { id: userId },
    } = request;
    const user = await findUserById(userId);
    const worldcup = await findWorldcupById(id);
    const comment = await commentService.save(user, worldcup, message);
    const {
      user: { nickname },
      createdAt,
      id: commentId,
    } = comment;
    response.json({ commentId, userId, nickname, createdAt, message });
  },

  deleteComment: async (request: Request, response: Response, next: NextFunction) => {
    const {
      params: { id },
    } = request;
    try {
      response.json(await commentService.deleteById(id));
    } catch (err) {
      next(err);
    }
  },

  getMyWorldcup: async (request: Request, response: Response, next: NextFunction) => {
    const { offset, limit, id } = request.query;
    try {
      const data = await worldcupService.findMyWorldcup(Number(offset), Number(limit), Number(id));
      response.json(succeed(data));
    } catch (err) {
      response.json(failed('getMyWorldcup error'));
    }
  },
};

export default worldcupController;
