import * as bodyParser from 'body-parser';
import { Request, Response } from 'express';
import router from '../api';

const expressLoader = (app) => {
  app.use(bodyParser.json());

  router.forEach((route) => {
    (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
      const result = new (route.controller as any)()[route.action](req, res, next);
      if (result instanceof Promise) {
        result.then((result) => (result !== null && result !== undefined ? res.send(result) : undefined));
      } else if (result !== null && result !== undefined) {
        res.json(result);
      }
    });
  });
};

export default expressLoader;
