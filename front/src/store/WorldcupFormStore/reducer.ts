export interface WorldcupState {
  title: string;
  desc: string;
  keywords: string[];
}

export type WorldcupAction =
  | { type: 'CHANGE_TITLE'; payload: string }
  | { type: 'CHANGE_DESC'; payload: string }
  | { type: 'ADD_KEYWORD'; payload: string };

export const initialWorldcupState: WorldcupState = {
  title: '',
  desc: '',
  keywords: [],
};

export default (state: WorldcupState, action: WorldcupAction): WorldcupState => {
  switch (action.type) {
    case 'CHANGE_TITLE': {
      const { payload: newTitle } = action;
      return { ...state, title: newTitle };
    }

    case 'CHANGE_DESC': {
      const { payload: newDesc } = action;
      return { ...state, desc: newDesc };
    }

    case 'ADD_KEYWORD': {
      const { payload: newKeyword } = action;
      return { ...state, keywords: [newKeyword] };
    }

    default: {
      throw new Error('Unexpected action type');
    }
  }
};
