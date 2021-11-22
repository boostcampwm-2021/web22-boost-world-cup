import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as passport from 'passport';
import sessionConfig from '../config/session';
import indexRouter from '../api';
import passportInit from './passport';
import { join } from 'path';

declare module 'express-session' {
  export interface SessionData {
    passport: any;
  }
}

const expressLoader = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(session(sessionConfig));
  app.use(passport.initialize());
  app.use(passport.session());

  passportInit();

  app.use('/api', indexRouter);

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('public'));
    app.use('*', (req, res) => {
      res.sendFile(join(__dirname, '..', '..', '/public/index.html'));
    });
  }

  app.use((error: Error, requset: express.Request, response: express.Response, next: express.NextFunction) => {
    response.status(500).json({ result: 'fail', message: error.message });
  });
};

export default expressLoader;
