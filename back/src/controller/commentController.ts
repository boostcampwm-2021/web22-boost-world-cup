import { NextFunction, Request, Response } from 'express';
import * as commentService from '../services/commentService';
import { findById as findUserById } from '../services/userService';
import { findById as findWorldcupById } from '../services/worldcupService';

const commentController = {
  saveComment: async (request: Request, response: Response, next: NextFunction) => {
    const {
      body: { worldcupId, message },
      user: { id: userId },
    } = request;
    const user = await findUserById(userId);
    const worldcup = await findWorldcupById(worldcupId);
    await commentService.save(user, worldcup, message);
    response.json({ result: 'success' });
  },
};

export default commentController;
