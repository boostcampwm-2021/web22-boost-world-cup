import { NextFunction, Request, Response } from 'express';
import * as worldcupService from '../services/worldcupService';
import * as commentService from '../services/commentService';
import { findById as findUserById } from '../services/userService';
import { findById as findWorldcupById } from '../services/worldcupService';
import { getCandidates } from '../services/candidateService';

const worldcupController = {
  all: async (request: Request, response: Response, next: NextFunction) => {
    const { offset, limit, search, keyword } = request.query;
    if (!search && !keyword) {
      return response.json(await worldcupService.findFromPage(Number(offset), Number(limit)));
    } else if (!keyword) {
      return response.json(await worldcupService.findBySearchWord(Number(offset), Number(limit), search));
    } else {
      return response.json(await worldcupService.findByKeyword(Number(offset), Number(limit), keyword));
    }
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
    response.json({ result: 'success', message: null });
  },

  remove: async (request: Request, response: Response, next: NextFunction) => {
    const { id } = request.params;
    await worldcupService.removeWorldcupById(Number(id));
    response.json({ result: 'success', message: null });
  },

  patchTitle: async (request: Request, response: Response, next: NextFunction) => {
    const { title } = request.body;
    const { id } = request.params;
    await worldcupService.patchWorldcupTitle(Number(id), title);
    response.json({ result: 'success', message: null });
  },

  patchDesc: async (request: Request, response: Response, next: NextFunction) => {
    const { desc } = request.body;
    const { id } = request.params;
    await worldcupService.patchWorldcupDesc(Number(id), desc);
    response.json({ result: 'success', message: null });
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
    const { id, offset, limit } = request.query;
    const data = await worldcupService.findMyWorldcup(id, offset, limit);
    response.json({
      result: 'success',
      message: null,
      data: {
        worldcup: data,
      },
    });
  },
};

export default worldcupController;
