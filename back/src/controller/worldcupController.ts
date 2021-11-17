import * as worldcupService from '../services/worldcupService';
import { getCandidates } from '../services/candidateService';
import { NextFunction, Request, Response } from 'express';

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
    await worldcupService.save(request.body);
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
};

export default worldcupController;
