export interface PreSignedData {
  presignedURL: string;
  key: string;
}

export interface ImgInfo {
  key: string;
  name: string;
}

export interface candidateData {
  id: number;
  name: string;
  url: string;
}

export interface gameInfoData {
  title: string;
  round: number;
  currentRound: number;
  candidate1: candidateData;
  candidate2: candidateData;
}
