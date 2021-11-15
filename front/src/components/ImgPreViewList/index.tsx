import React, { useContext } from 'react';
import styled from 'styled-components';
import ImgInput from '../ImgInput';
import ImgPreView from '../ImgPreView';
import { ImgInfo } from '../../types/Datas';
import { UploadImgState } from '../../pages/Make/store';

interface Props {
  imgInfos: ImgInfo[];
  onAddImgs: React.ChangeEventHandler<HTMLInputElement>;
}

function ImgPreViewList({ imgInfos, onAddImgs }: Props): JSX.Element {
  const { willUploadFiles, presignedURLs } = useContext(UploadImgState);
  const imgs = imgInfos.map((info: ImgInfo, idx: number) => (
    <ImgPreView
      key={info.key}
      info={info}
      tab={1}
      willUploadFile={willUploadFiles[idx]}
      presignedURL={presignedURLs[idx]}
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
