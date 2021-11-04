import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import ImgInput from '../ImgInput';
import ImgPreView from '../ImgPreView';
import { ImgInfo } from '../../types/Datas';

interface Props {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onDeleteImg: (key: string) => void;
  imgInfos: ImgInfo[];
}

function ImgPreViewList({ onChange, onDeleteImg, imgInfos }: Props): JSX.Element {
  const imgListRef = useRef<HTMLUListElement | null>(null);
  const imgs = imgInfos.map((info: ImgInfo) => (
    <ImgPreView key={info.key} onDelete={onDeleteImg} info={info} width={143} height={160} deleteBtnExist />
  ));
  return (
    <Container>
      <ImgInput onChange={onChange} type="addAdditionalImgs" />
      <ImgsWrapper ref={imgListRef}>{imgs}</ImgsWrapper>
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
