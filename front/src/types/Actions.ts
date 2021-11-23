import { UserState } from './States';

export interface FormAction<T> {
  type: keyof T;
  payload: T[keyof T];
}

export type UserAction = { type: 'LOGOUT' } | { type: 'LOGIN'; payload: UserState };
