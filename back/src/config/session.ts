import 'dotenv/config';

const sessionConfig = {
  httpOnly: true,
  key: 'sid',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 24000 * 60 * 60,
  },
};

export default sessionConfig;
