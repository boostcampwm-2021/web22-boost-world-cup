import { NextFunction, Request, Response } from 'express';
import * as worldcupService from '../services/worldcupService';

const gameController = {
  temp: async (request: Request, response: Response, next: NextFunction) => {
    const {
      params: { id: worldcupId },
    } = request;
    console.log(worldcupId);
    if (request.cookies.info) {
      console.log(request.cookies.info);
      console.log(request.cookies.info.round);
    } else {
      const worldcup = await worldcupService.findById(worldcupId);
      console.log(worldcup);
      // const tempDate = {
      //   round: 16,
      //   candidate: [{ name: '한지민' }, { name: '한효주' }],
      // };
      // response.cookie('info', tempDate, { maxAge: 10000 });
    }
    response.json({ result: 'Hello' });
    // return await worldcupService.removeById(request.params.id);
  },
};

export default gameController;
