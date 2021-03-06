import 'reflect-metadata';
import ormConfig from '../config/orm';
import { createConnection } from 'typeorm';

const ormLoader = async () => {
  try {
    await createConnection(ormConfig);
  } catch (err) {
    console.log(err);
  }
};

export default ormLoader;
