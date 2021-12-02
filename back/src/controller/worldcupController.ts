import { NextFunction, Request, Response } from 'express';
import * as worldcupService from '../services/worldcupService';
import * as commentService from '../services/commentService';
import * as authService from '../services/authService';
import * as candidateService from '../services/candidateService';
import ApiResult from '../utils/ApiResult';

const { succeed, failed } = ApiResult;

const worldcupController = {
  get: async (request: Request, response: Response, next: NextFunction) => {
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

  getMetadata: async (request: Request, response: Response, next: NextFunction) => {
    if (!request.user) {
      return response.status(401).json(failed('Unauthorized'));
    }
    const {
      params: { id: worldcupId },
      query: { metaonly, searchWord },
    } = request;
    try {
      if (metaonly) {
        const worldcupMetadata = await worldcupService.getMetaData(Number(worldcupId), String(searchWord));
        return response.json(succeed(worldcupMetadata));
      }
    } catch (e) {
      response.status(400).json(failed(e.message));
    }
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

  delete: async (request: Request, response: Response, next: NextFunction) => {
    if (!request.user) return response.status(401).json(failed('not authorized'));
    const {
      params: { id: worldcupId },
      user: { id: userId },
    } = request;
    try {
      await worldcupService.removeById(Number(worldcupId), Number(userId));
      response.json(succeed(null));
    } catch (e) {
      response.status(400).json(failed(e.message));
    }
  },

  patchTitle: async (request: Request, response: Response, next: NextFunction) => {
    const {
      body: { title },
      params: { id },
    } = request;
    try {
      await worldcupService.patchTitle(Number(id), title);
      response.json(succeed(null));
    } catch (e) {
      response.status(400).json(failed('cannot patch worldcup title'));
    }
  },

  patchDesc: async (request: Request, response: Response, next: NextFunction) => {
    const {
      body: { desc },
      params: { id },
    } = request;
    try {
      await worldcupService.patchDesc(Number(id), desc);
      response.json(succeed(null));
    } catch (e) {
      response.status(400).json(failed('cannot patch worldcup desc'));
    }
  },

  getCandidates: async (request: Request, response: Response, next: NextFunction) => {
    const {
      query: { offset, limit, random },
      params: { id },
    } = request;

    try {
      if (random) {
        const candidates = await candidateService.getRandomList(Number(id), Number(limit));
        response.json(succeed(candidates));
        return;
      }
      const candidates = await candidateService.getCandidates(Number(id), Number(offset), Number(limit));
      response.json(succeed(candidates));
    } catch (e) {
      response.status(400).json(failed('cannot get candidates'));
    }
  },

  getComments: async (request: Request, response: Response, next: NextFunction) => {
    const {
      params: { id },
      query: { offset, limit, length },
    } = request;
    try {
      if (length) {
        const worldcup = await worldcupService.findById(id);
        const comments = await commentService.getCountByWorldcupId(worldcup);
        return response.json(succeed(comments));
      }
      const comments = await commentService.findByWorldcupId(id, offset as string, limit as string);
      comments.map((comment) => {
        comment.createdAt = `${comment.createdAt.getFullYear()}-${
          comment.createdAt.getMonth() + 1
        }-${comment.createdAt.getDate()} ${comment.createdAt.getHours()}:${comment.createdAt.getMinutes()}:${comment.createdAt.getSeconds()}`;
      });
      response.json(succeed(comments));
    } catch (e) {
      response.status(400).json(failed('cannot get comments'));
    }
  },

  saveComment: async (request: Request, response: Response, next: NextFunction) => {
    const {
      params: { id },
      body: { message },
      user: { id: userId },
    } = request;
    try {
      const [user, worldcup] = await Promise.all([authService.findById(userId), worldcupService.findById(id)]);
      const {
        user: { nickname },
        createdAt,
        id: commentId,
      } = await commentService.save(user, worldcup, message);
      const comment = { commentId, userId, nickname, createdAt, message };
      response.json(succeed(comment));
    } catch (e) {
      response.status(400).json(failed('cannot save comment'));
    }
  },

  deleteComment: async (request: Request, response: Response, next: NextFunction) => {
    const {
      params: { id },
    } = request;
    try {
      await commentService.deleteById(id);
      response.json(succeed(null));
    } catch (e) {
      response.status(400).json(failed('cannot delete comment'));
    }
  },

  getMyWorldcups: async (request: Request, response: Response, next: NextFunction) => {
    const { offset, limit } = request.query;
    const { id } = request.user;
    try {
      const worldcup = await worldcupService.findMyWorldcup(Number(offset), Number(limit), Number(id));
      response.json(succeed(worldcup));
    } catch (err) {
      response.status(400).json(failed('cannot get myWorldcup list'));
    }
  },
};

export default worldcupController;
