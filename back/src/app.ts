import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Request, Response } from 'express';
import router from './api';
import ormConfig from './config/ormConfig';

createConnection(ormConfig)
  .then(async (connection) => {
    const app = express();
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

    app.listen(8000);

    console.log('Express server has started on port 8000. Open http://localhost:8000/users to see results');
  })
  .catch((error) => console.log(error));
