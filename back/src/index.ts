import 'dotenv/config';
import loader from './loaders';
import * as express from 'express';

const startServer = async () => {
  const app = express();
  await loader(app);
  const port = process.env.PORT || 8000;
  app.listen(port, () => {
    console.log(`Express server has started on ${port}.`);
  });
};

startServer();
