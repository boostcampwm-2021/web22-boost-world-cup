import { json, NextFunction, Request, Response } from 'express';
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
    if (!search && !keyword) {
      response.json(succeed(await worldcupService.findFromPage(Number(offset), Number(limit))));
    } else if (!keyword) {
      response.json(succeed(await worldcupService.findBySearchWord(Number(offset), Number(limit), search)));
    } else {
      response.json(succeed(await worldcupService.findByKeyword(Number(offset), Number(limit), keyword)));
    }
  },

  one: async (request: Request, response: Response, next: NextFunction) => {
    const {
      params: { id },
      query: { metaonly },
    } = request;
    if (metaonly) {
      return response.json(succeed(await worldcupService.getMetaData(Number(id))));
    }
    return response.status(400).json(failed('cannot get worldcup metadata'));
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
    const { title } = request.body;
    const { id } = request.params;
    try {
      await worldcupService.patchWorldcupTitle(Number(id), title);
      response.json(succeed(null));
    } catch (e) {
      response.json(failed('cannot patch worldcup title'));
    }
  },

  patchDesc: async (request: Request, response: Response, next: NextFunction) => {
    const { desc } = request.body;
    const { id } = request.params;
    try {
      await worldcupService.patchWorldcupDesc(Number(id), desc);
      response.json(succeed(null));
    } catch (e) {
      response.json(failed('cannot patch worldcup desc'));
    }
  },

  getCandidates: async (request: Request, response: Response, next: NextFunction) => {
    const { offset, limit } = request.query;
    const { id } = request.params;
    try {
      response.json(succeed(await getCandidates(Number(id), Number(offset), Number(limit))));
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
      response.json(succeed(await commentService.getCountByWorldcupId(worldcup)));
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
    const user = await findUserById(userId);
    const worldcup = await findWorldcupById(id);
    const comment = await commentService.save(user, worldcup, message);
    const {
      user: { nickname },
      createdAt,
      id: commentId,
    } = comment;
    response.json(succeed({ commentId, userId, nickname, createdAt, message }));
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
    const { offset, limit } = request.query;
    const { id } = request.user;
    try {
      const data = await worldcupService.findMyWorldcup(Number(offset), Number(limit), Number(id));
      response.json(succeed(data));
    } catch (err) {
      response.json(failed('cannot get myWorldcup list'));
    }
  },
};

export default worldcupController;
