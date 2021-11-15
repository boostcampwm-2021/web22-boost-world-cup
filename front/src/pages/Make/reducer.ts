export interface WorldcupFormState {
  title: string;
  desc: string;
  keywords: string[];
}

export type WorldcupFormAction =
  | { type: 'CHANGE_TITLE'; payload: string }
  | { type: 'CHANGE_DESC'; payload: string }
  | { type: 'ADD_KEYWORD'; payload: string };

export const initialWorldcupFormState: WorldcupFormState = {
  title: '',
  desc: '',
  keywords: [],
};

export const worldcupFormReducer = (state: WorldcupFormState, action: WorldcupFormAction): WorldcupFormState => {
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

export interface UploadState {
  willUploadFiles: File[];
  presignedURLs: string[];
}

export type UploadAction =
  | { type: 'ADD_FILES'; payload: File[] }
  | { type: 'ADD_PRESIGNED_URL'; payload: string[] }
  | { type: 'RESET' };

export const initialUploadState: UploadState = {
  willUploadFiles: [],
  presignedURLs: [],
};

export const uploadReducer = (state: UploadState, action: UploadAction): UploadState => {
  switch (action.type) {
    case 'ADD_FILES': {
      const { payload: newFiles } = action;
      return { ...state, willUploadFiles: [...state.willUploadFiles, ...newFiles] };
    }
    case 'ADD_PRESIGNED_URL': {
      const { payload: newPresignedURLs } = action;
      return { ...state, presignedURLs: [...state.presignedURLs, ...newPresignedURLs] };
    }
    case 'RESET': {
      return { willUploadFiles: [], presignedURLs: [] };
    }
    default:
      throw new Error('Unexpected action type');
  }
};
