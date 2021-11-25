import React from 'react';
import styled from 'styled-components';
import ImgTableRow from '../ImgTableRow';
import Pagination from '../Pagination';
import { ImgInfo } from '../../types/Datas';
import { ImgsAction } from '../../hooks/useImgInfos';

interface Props {
  imgInfos: ImgInfo[];
  currentPage: number;
  lastPage: number;
  offset: number;
  onPageChange: (nextPage: number) => void;
  imgInfosDispatcher: React.Dispatch<ImgsAction>;
}

function ImgTable({ imgInfos, currentPage, lastPage, offset, onPageChange, imgInfosDispatcher }: Props): JSX.Element {
  const rows = imgInfos.map((info, idx) => (
    <ImgTableRow key={info.id} imgInfo={info} num={offset + idx + 1} imgInfosDispatcher={imgInfosDispatcher} />
  ));

  return (
    <Container>
      <Title>이미지 이름 수정/삭제</Title>
      <TableHeader>
        <TableHeaderItem style={{ width: '50px' }}>순번</TableHeaderItem>
        <TableHeaderItem style={{ width: '120px' }}>이미지</TableHeaderItem>
        <TableHeaderItem style={{ width: '228px' }}>이름 변경</TableHeaderItem>
        <TableHeaderItem style={{ width: '380px' }}>이미지 변경</TableHeaderItem>
        <TableHeaderItem style={{ width: '100px' }}>삭제</TableHeaderItem>
      </TableHeader>
      <RowsWrapper>
        {imgInfos.length ? (
          rows
        ) : (
          <Placeholder>
            아직 이미지를 추가하지 않았습니다.
            <hr />
            기본정보 수정 / 이미지 업로드 탭에서 이미지를 업로드해보세요!
          </Placeholder>
        )}
      </RowsWrapper>
      <Footer>
        <Pagination lastPage={lastPage} currentPage={currentPage} onPageChange={onPageChange} />
      </Footer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 40px 20px 40px;
  background-color: ${({ theme }) => theme.color.white};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const Title = styled.div`
  margin-bottom: 20px;
  ${({ theme }) => theme.fontStyle.h3};
`;

const TableHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  border-bottom: 1px solid ${({ theme }) => theme.color.black};
`;

const TableHeaderItem = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ theme }) => theme.fontStyle.bodyBold};
`;

const RowsWrapper = styled.div`
  width: 100%;
`;

const Placeholder = styled.div`
  margin-top: 40px;
  ${({ theme }) => theme.fontStyle.h3};
  text-align: center;
  font-size: 17px;
  font-weight: bold;
`;

const Footer = styled.footer`
  width: fit-content;
  position: relative;
  left: 40%;
  margin-top: 18px;
`;

export default ImgTable;
