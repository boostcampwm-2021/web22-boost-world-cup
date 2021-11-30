import React from 'react';
import styled from 'styled-components';
import ImgPreView from '../ImgPreView';
import AddAdditionalImg from '../ImgInputs/AddAdditionalImgs';
import { ImgInfo } from '../../types/Datas';
import { ImgsAction } from '../../types/Actions';
import { UploadState } from '../../types/States';

interface Props {
  imgInfos: ImgInfo[];
  uploadState: UploadState;
  onAddImgs: React.ChangeEventHandler<HTMLInputElement>;
  imgInfosDispatcher: React.Dispatch<ImgsAction>;
}

function ImgPreViewList({ imgInfos, uploadState, onAddImgs, imgInfosDispatcher }: Props): JSX.Element {
  const { willUploadFiles, presignedURLs } = uploadState;
  const imgs = imgInfos.map((info: ImgInfo, idx: number) => (
    <ImgPreView
      key={info.id}
      info={info}
      tab={1}
      willUploadFile={willUploadFiles[idx]}
      presignedURL={presignedURLs[idx]}
      imgInfosDispatcher={imgInfosDispatcher}
    />
  ));

  return (
    <Container>
      <AddAdditionalImg onChange={onAddImgs} />
      <ImgsWrapper>{imgs}</ImgsWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 10px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.black};
`;

const ImgsWrapper = styled.ul`
  flex-wrap: wrap;
  padding-bottom: 10px;
  padding-top: 20px;
  margin-left: 10px;
  li {
    display: inline-block;
    margin: 0 15px;
  }
  li:first-child {
    margin-left: 0;
  }
  li:last-child {
    margin-right: 0;
  }
`;

export default ImgPreViewList;
