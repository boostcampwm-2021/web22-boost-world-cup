import { WorldcupFormState } from '../../types/States';
import { FormAction } from '../../types/Actions';

export const initialWorldcupFormState: WorldcupFormState = {
  title: '',
  desc: '',
  keywords: [],
  imgInfos: [],
};

export default (state: WorldcupFormState, action: FormAction<WorldcupFormState>): WorldcupFormState => {
  const { type, payload } = action;
  return { ...state, [type]: payload };
};
