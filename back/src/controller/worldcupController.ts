import { NextFunction, Request, Response } from 'express';
import * as worldcupService from '../services/worldcupService';

const worldcupController = {
  all: async (request: Request, response: Response, next: NextFunction) => {
    response.header('Access-Control-Allow-Origin', '*');
    const offset = request.query.offset;
    const limit = request.query.limit;
    const search = request.query.search;
    const worldcup =
      offset && limit
        ? await worldcupService.findPart(Number(offset), Number(limit))
        : search
        ? await worldcupService.findByKeyword(String(search))
        : await worldcupService.findAll();
    response.json(worldcup);
  },
};
export default worldcupController;
