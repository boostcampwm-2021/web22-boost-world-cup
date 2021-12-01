export interface PreSignedData {
  presignedURL: string;
  key: string;
}

export interface ImgInfo {
  key: string;
  name: string;
  isUploaded?: boolean;
  id: number;
}

export interface candidateData {
  id: number;
  name: string;
  imgKey: string;
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

export interface RankingData {
  id: number;
  name: string;
  imgKey: string;
  winRatio: number;
  victoryRatio: number;
  male: number;
  female: number;
  teens: number;
  twenties: number;
  thirties: number;
  forties: number;
  fifties: number;
  etc: number;
}

export interface InfoData {
  id: number;
  name: string;
  male: number;
  female: number;
  teens: number;
  twenties: number;
  thirties: number;
  forties: number;
  fifties: number;
  etc: number;
}

export interface DoughnutChartData {
  id: number;
  value: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  isLargeArc: number;
  targetArc: number;
}

export interface WorldcupMetaData {
  totalCnt: number;
  title: string;
  description: string;
  keywords: string[];
}

export interface UserInfo {
  id: number;
  nickname: string;
  gender: number;
  age: number;
}

export interface Worldcup {
  id: number;
  thumbnail1: string;
  thumbnail2: string;
  title: string;
  description: string;
}
