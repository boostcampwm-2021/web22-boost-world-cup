import React from 'react';
import styled from 'styled-components';
import { BiChevronLeftCircle, BiChevronRightCircle } from 'react-icons/bi';

interface Props {
  pageCnt: number;
  currentPage: number;
  onSpecificPageBtnClick: React.MouseEventHandler<HTMLButtonElement>;
  onPreBtnClick: React.MouseEventHandler<HTMLButtonElement>;
  onNextBtnClick: React.MouseEventHandler<HTMLButtonElement>;
}

function Pagination({
  pageCnt,
  currentPage,
  onSpecificPageBtnClick,
  onPreBtnClick,
  onNextBtnClick,
}: Props): JSX.Element {
  const SHOW_PAGE_CNT = 9;
  const preCycleCnt = SHOW_PAGE_CNT * Math.floor((currentPage - 1) / SHOW_PAGE_CNT);
  const pageBtns = Array.from(
    { length: preCycleCnt + SHOW_PAGE_CNT > pageCnt ? pageCnt - preCycleCnt : SHOW_PAGE_CNT },
    (_, idx) => idx + 1 + preCycleCnt,
  ).map((page) => (
    <PageBtn
      activated={page === currentPage}
      disabled={page === currentPage}
      onClick={onSpecificPageBtnClick}
      key={page}
    >
      {page}
    </PageBtn>
  ));

  if (!pageCnt) return <div />;

  return (
    <Container>
      <ArrowBtn type="button" position="left" onClick={onPreBtnClick} disabled={currentPage <= 1}>
        <BiChevronLeftCircle size={40} />
      </ArrowBtn>
      {pageBtns}
      <ArrowBtn type="button" position="right" onClick={onNextBtnClick} disabled={currentPage >= pageCnt}>
        <BiChevronRightCircle size={40} />
      </ArrowBtn>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const PageBtn = styled.button<{ activated: boolean }>`
  width: 45px;
  height: 45px;
  margin: 0 5px;
  line-height: 45px;
  background-color: ${({ activated, theme }) => (activated ? theme.color.pink : theme.color.white)};
  border: ${({ activated, theme }) =>
    activated ? `2px solid ${theme.color.black}` : `1px solid ${theme.color.gray[0]}`};
  ${({ activated, theme }) => (activated ? theme.fontStyle.bodyBold : theme.fontStyle.body)};
  transition: background-color 0.3s;
  &:disabled {
    cursor: unset;
    color: ${({ theme }) => theme.color.black};
  }
  &:hover {
    ${({ activated, theme }) => (activated ? '' : `background-color: ${theme.color.primary}`)};
  }
`;

const ArrowBtn = styled.button<{ position: 'left' | 'right' }>`
  height: 40px;
  margin-left: ${({ position }) => (position === 'left' ? 0 : `15px`)};
  margin-right: ${({ position }) => (position === 'right' ? 0 : `15px`)};
  &:disabled {
    cursor: unset;
  }
`;

export default Pagination;
