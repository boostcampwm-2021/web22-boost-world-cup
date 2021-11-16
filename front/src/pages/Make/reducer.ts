import { WorldcupFormState } from '../../types/States';
import { WorldcupFormAction } from '../../types/Actions';

export const initialWorldcupFormState: WorldcupFormState = {
  title: '',
  desc: '',
  imgInfos: [],
};

export default (state: WorldcupFormState, action: WorldcupFormAction): WorldcupFormState => {
  const { type, payload } = action;
  switch (type) {
    case 'CHANGE_TITLE': {
      if (typeof payload !== 'string') throw new Error(`payload of Action: CHANGE_TITLE must be string`);
      return { ...state, title: payload };
    }
    case 'CHANGE_DESC': {
      if (typeof payload !== 'string') throw new Error(`payload of Action: CHANGE_DESC must be string`);
      return { ...state, desc: payload };
    }
    case 'CHANGE_IMG_INFOS': {
      if (typeof payload === 'string') throw new Error(`payload of Action: CHANGE_IMG_INFOS must be ImgInfo`);
      return { ...state, imgInfos: payload };
    }
    default: {
      throw new Error(`Unexpected Action type: ${type}`);
    }
  }
};
