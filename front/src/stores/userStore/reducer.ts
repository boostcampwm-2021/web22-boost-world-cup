import { UserState } from '../../types/States';
import { UserAction } from '../../types/Actions';

export const defaultUserState: UserState = {
  isLoggedIn: false,
  id: null,
  nickname: null,
  gender: null,
  age: null,
};

export default function userReducer(state: UserState, action: UserAction): UserState {
  switch (action.type) {
    case 'LOGOUT': {
      return defaultUserState;
    }
    case 'LOGIN': {
      return action.payload;
    }
    default: {
      throw new Error(`Unexpected action type`);
    }
  }
}
