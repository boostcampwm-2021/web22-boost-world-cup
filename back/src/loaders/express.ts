import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as passport from 'passport';
import 'dotenv/config';
import sessionConfig from '../config/session';
import indexRouter from '../api';
import passportInit from './passport';

const expressLoader = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(session(sessionConfig));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(express.static('public'));

  passportInit();

  app.use('/api', indexRouter);
  app.use('/tmp', indexRouter);
};

export default expressLoader;
