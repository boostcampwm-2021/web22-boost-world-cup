import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import sessionConfig from '../config/session';
import indexRouter from '../api';

const expressLoader = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(session(sessionConfig));

  app.use('/api', indexRouter);
};

export default expressLoader;
