import ormLoader from './orm';
import expressLoader from './express';

const indexLoader = async (app) => {
  expressLoader(app);
  await ormLoader();
};

export default indexLoader;
