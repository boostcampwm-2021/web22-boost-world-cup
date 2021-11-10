export interface PreSignedDataFields {
  [key: string]: string;
  Policy: string;
  'X-Amz-Algorithm': string;
  'X-Amz-Credential': string;
  'X-Amz-Date': string;
  'X-Amz-Signature': string;
  bucket: string;
  key: string;
}

export interface PreSignedData {
  fields: PreSignedDataFields;
  url: string;
}

export interface ImgInfo {
  key: string;
  name: string;
}

export interface FetchPreSigned {
  key: string;
  preSignedData: PreSignedData;
}

export interface candidateData {
  id: number;
  name: string;
  url: string;
}

export interface gameInfoData {
  isCompleted: boolean;
  title: string;
  round: number;
  currentRound: number;
  candidate1: candidateData;
  candidate2: candidateData;
  winCandidate: candidateData;
}
