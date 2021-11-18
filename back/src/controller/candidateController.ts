import { NextFunction, Request, Response } from 'express';
import * as candidateService from '../services/candidateService';
import { findById } from '../services/worldcupService';
import { deleteFromEveryBucket } from '../utils/cloud';

const candidateController = {
  remove: async (request: Request, response: Response, next: NextFunction) => {
    const { key } = request.params;
    await Promise.all([deleteFromEveryBucket(key), candidateService.removeByKey(key)]);
    response.json({ result: 'success' });
  },

  patchCandidate: async (request: Request, response: Response, next: NextFunction) => {
    const { key } = request.params;
    const { newKey, name } = request.body;
    await candidateService.patchCandidate(key, name, newKey);
    response.json({ result: 'success' });
  },

  createCandidates: async (request: Request, response: Response, next: NextFunction) => {
    const { worldcupId, newImgInfos } = request.body;
    const worldcup = await findById(worldcupId);
    await candidateService.save(newImgInfos, worldcup);
    response.json({ result: 'success' });
  },
};

export default candidateController;
