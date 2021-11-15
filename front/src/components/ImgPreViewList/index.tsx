import React from 'react';
import styled from 'styled-components';
import ImgInput from '../ImgInput';
import ImgPreView from '../ImgPreView';
import { ImgInfo } from '../../types/Datas';
import { ImgsAction } from '../../hooks/useImgInfos';
import { UploadState } from '../../hooks/useUploadState';

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
      <ImgInput onChange={onAddImgs} type="addAdditionalImgs" />
      <ImgsWrapper>{imgs}</ImgsWrapper>
    </Container>
  );
}

const Container = styled.div`
  background-color: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.black};
  border-radius: 10px;
  width: 1312px;
  height: 260px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImgsWrapper = styled.ul`
  width: 1075px;
  height: 200px;
  padding-top: 20px;
  overflow-x: scroll;
  overflow-y: visible;
  white-space: nowrap;
  margin-left: 30px;
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
