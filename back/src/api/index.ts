import userRouter from './userRouter';
import authRouter from './authRouter';

const indexRouter = [...userRouter, ...authRouter];

export default indexRouter;
