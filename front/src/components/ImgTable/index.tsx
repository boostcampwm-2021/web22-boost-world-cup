import React from 'react';
import styled from 'styled-components';
import ImgTableRow from '../ImgTableRow';
import StoreBtns from '../StoreBtns';
import { ImgInfo } from '../../types/Datas';

interface Props {
  imgInfos: ImgInfo[];
  onDeleteImg: (key: string) => void;
  getOnImgNameChange: (imgKey: string) => React.ChangeEventHandler<HTMLInputElement>;
  getOnImgChange: (preImgKey: string) => React.ChangeEventHandler<HTMLInputElement>;
  onStore: React.MouseEventHandler<HTMLButtonElement>;
}

function ImgTable({ imgInfos, onDeleteImg, getOnImgNameChange, getOnImgChange, onStore }: Props): JSX.Element {
  const rows = imgInfos.map((info, idx) => (
    <ImgTableRow
      onDelete={onDeleteImg}
      imgInfo={info}
      key={info.key}
      getOnImgNameChange={getOnImgNameChange}
      getOnImgChange={getOnImgChange}
      num={idx + 1}
    />
  ));
  return (
    <Container>
      <TitleRow>이미지 이름 수정/삭제</TitleRow>
      <TableHeader>
        <TableHeaderItem style={{ width: '138px' }}>순번</TableHeaderItem>
        <TableHeaderItem style={{ width: '144px' }}>이미지</TableHeaderItem>
        <TableHeaderItem style={{ width: '487px' }}>이름 변경</TableHeaderItem>
        <TableHeaderItem style={{ width: '625px' }}>이미지 변경</TableHeaderItem>
        <TableHeaderItem style={{ width: '450px' }}>삭제</TableHeaderItem>
      </TableHeader>
      <RowsWrapper>{rows}</RowsWrapper>
      <StoreBtns onStore={onStore} />
    </Container>
  );
}

const Container = styled.div`
  width: 1844px;
  height: 811px;
  background-color: ${({ theme }) => theme.color.white};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const TitleRow = styled.div`
  ${({ theme }) => theme.fontStyle.h1};
  padding-left: 137px;
  width: 100%;
  margin-top: 26px;
  margin-bottom: 20px;
`;

const TableHeader = styled.div`
  height: 80px;
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.color.black};
`;

const TableHeaderItem = styled.div`
  height: 80px;
  ${({ theme }) => theme.fontStyle.h2};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RowsWrapper = styled.div`
  height: 545px;
  overflow: scroll;
`;

export default ImgTable;
