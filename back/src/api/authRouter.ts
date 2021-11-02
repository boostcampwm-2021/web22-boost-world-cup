import { AuthController } from '../controller/authController';

const userRouter = [
  {
    method: 'get',
    route: '/api/auth/github/callback',
    controller: AuthController,
    action: 'githubCallback',
  },
];

export default userRouter;
