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

export interface RankingData {
  id: number;
  name: string;
  url: string;
  total: number;
  showCnt: number;
  winCnt: number;
  victoryCnt: number;
  male: number;
  female: number;
  teens: number;
  twenties: number;
  thirties: number;
  forties: number;
  etc: number;
}
export interface RankingSummaryData {
  id: number;
  url: string;
  name: string;
  victoryRatio: number;
  winRatio: number;
}
export interface InfoData {
  name: string;
  total: number;
  male: number;
  female: number;
  teens: number;
  twenties: number;
  thirties: number;
  forties: number;
  etc: number;
}
export interface DoughnutChartData {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  isLargeArc: number;
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

export interface UserInfo {
  id?: number;
  nickname?: string;
  gender?: number;
  age?: number;
}
