export interface PreSignedData {
  presignedURL: string;
  key: string;
}

export interface ImgInfo {
  key: string;
  name: string;
  isUploaded: boolean;
  id: number;
}

export interface candidateData {
  id: number;
  name: string;
  url: string;
}

export interface gameInfoData {
  isCompleted: boolean;
  worldcupId: string;
  title: string;
  round: number;
  currentRound: number;
  candidatesList: candidateData[];
  selectedCandidate: candidateData[];
  winCandidate: candidateData;
}

export interface CommentData {
  commentId: number;
  userId: number;
  message: string;
  createdAt: string;
  nickname: string;
}

export interface ErrorResponseData {
  result: 'fail';
  message: string;
}

export interface WorldcupMetaData {
  totalCnt: number;
  title: string;
  description: string;
}

export interface Candidate {
  url: string;
  name: string;
  id: number;
}
