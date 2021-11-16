export interface PreSignedData {
  presignedURL: string;
  key: string;
}

export interface ImgInfo {
  key: string;
  name: string;
  isUploaded: boolean;
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
  message: string;
  createdAt: string;
  nickname: string;
}
