import React, { useEffect } from 'react';
import styled from 'styled-components';
import ImgTableRow from '../ImgTableRow';
import StoreBtns from '../StoreBtns';
import Pagination from '../ImgTablePagination';
import { ImgInfo } from '../../types/Datas';

interface Props {
  imgInfos: ImgInfo[];
  currentPage: number;
  lastPage: number;
  startIdx: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  onPageChange: (nextPage: number) => void;
}

function ImgTable({ imgInfos, currentPage, lastPage, startIdx, setCurrentPage, onPageChange }: Props): JSX.Element {
  const onSpecificPageBtnClick: React.MouseEventHandler<HTMLButtonElement> = ({ currentTarget }) => {
    const nextPage = Number(currentTarget.innerText);
    if (currentPage === nextPage) return;
    onPageChange(nextPage);
  };

  const onPreBtnClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (currentPage === 1) return;
    const nextPage = currentPage - 1;
    onPageChange(nextPage);
  };

  const onNextBtnClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (currentPage === lastPage) return;
    const nextPage = currentPage + 1;
    onPageChange(nextPage);
  };

  const rows = imgInfos.map((info, idx) => <ImgTableRow key={info.key} imgInfo={info} num={startIdx + idx + 1} />);

  useEffect(() => {
    if (currentPage > lastPage && lastPage >= 1) setCurrentPage(lastPage);
  }, [imgInfos.length]);

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
        <Pagination
          pageCnt={lastPage}
          currentPage={currentPage}
          onSpecificPageBtnClick={onSpecificPageBtnClick}
          onPreBtnClick={onPreBtnClick}
          onNextBtnClick={onNextBtnClick}
        />
        <StoreBtns />
      </Footer>
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
  width: 100%;
  overflow: scroll;
`;

const Placeholder = styled.div`
  ${({ theme }) => theme.fontStyle.h2};
  text-align: center;
  margin-top: 200px;
`;

const Footer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 0 60px;
`;

export default ImgTable;
