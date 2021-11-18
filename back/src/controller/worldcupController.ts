import { NextFunction, Request, Response } from 'express';
import * as worldcupService from '../services/worldcupService';
import * as commentService from '../services/commentService';
import { findById as findUserById } from '../services/userService';
import { findById as findWorldcupById } from '../services/worldcupService';
import { getCandidates } from '../services/candidateService';

const worldcupController = {
  all: async (request: Request, response: Response, next: NextFunction) => {
    const { offset, limit, search, keyword } = request.query;
    let worldcups;
    if (!search && !keyword) {
      worldcups = await worldcupService.findFromPage(offset, limit);
    } else if (!keyword) {
      worldcups = await worldcupService.findBySearchWord(offset, limit, search);
    } else {
      worldcups = await worldcupService.findByKeyword(offset, limit, keyword);
    }
    response.json({
      result: 'success',
      message: null,
      data: {
        worldcup: worldcups,
      },
    });
  },

  one: async (request: Request, response: Response, next: NextFunction) => {
    const { metaonly } = request.query;
    const { id } = request.params;
    if (metaonly) {
      const metadata = await worldcupService.getMetaData(Number(id));
      return response.json(metadata);
    }
    const worldcup = await worldcupService.findById(id);
    response.json(worldcup);
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
    return await worldcupService.removeById(request.params.id);
  },

  patchTitle: async (request: Request, response: Response, next: NextFunction) => {
    const { title } = request.body;
    const { id } = request.params;
    await worldcupService.patchWorldcupTitle(Number(id), title);
    response.end();
  },

  patchDesc: async (request: Request, response: Response, next: NextFunction) => {
    const { desc } = request.body;
    const { id } = request.params;
    await worldcupService.patchWorldcupDesc(Number(id), desc);
    response.end();
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
      response.json({ comments });
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
};

export default worldcupController;
