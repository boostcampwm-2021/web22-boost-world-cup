import { NextFunction, Request, Response } from 'express';
import * as commentService from '../services/commentService';
import { findById as findUserById } from '../services/userService';
import { findById as findWorldcupById } from '../services/worldcupService';

const commentController = {
  get: async (request: Request, response: Response, next: NextFunction) => {
    const {
      params: { worldcupId },
      query: { offset, limit },
    } = request;
    const comments = await commentService.findByWorldcupId(worldcupId, offset as string, limit as string);
    response.json({ comments });
  },

  save: async (request: Request, response: Response, next: NextFunction) => {
    const {
      body: { worldcupId, message },
      user: { id: userId },
    } = request;
    const user = await findUserById(userId);
    const worldcup = await findWorldcupById(worldcupId);
    const comment = await commentService.save(user, worldcup, message);
    const {
      user: { nickname },
      createdAt,
      id: commentId,
    } = comment;
    response.json({ commentId, userId, nickname, createdAt, message });
  },

  delete: async (request: Request, response: Response, next: NextFunction) => {
    const {
      params: { commentId },
    } = request;
    try {
      response.json(await commentService.deleteById(commentId));
    } catch (err) {
      next(err);
    }
  },
};

export default commentController;
