import { UserInterface } from './User';

declare global {
  namespace Express {
    export interface User extends UserInterface {}
  }
}
