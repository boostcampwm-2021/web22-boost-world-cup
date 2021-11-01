import ormLoader from './orm';
import expressLoader from './express';

const indexLoader = async (app) => {
  await ormLoader();
  expressLoader(app);
};

export default indexLoader;
