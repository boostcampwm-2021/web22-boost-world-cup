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
  candidate_id: number;
  candidate_url: string;
  candidate_show_cnt: number;
  candidate_win_cnt: number;
  candidate_victory_cnt: number;
  candidate_name: string;
  candidate_created_at: Date;
  candidate_worldcup_id: number;
  info_id: number;
  info_total: number;
  info_male: number;
  info_female: number;
  info_teens: number;
  info_twenties: number;
  info_thirties: number;
  info_forties: number;
  info_etc: number;
  info_candidate_id: number;
}
export interface ErrorResponseData {
  result: 'fail';
  message: string;
}
