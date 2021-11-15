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

export default (state: UploadState, action: UploadAction): UploadState => {
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
