import React, { memo } from 'react';
import styled from 'styled-components';
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import { SHOW_PAGE_LIMIT } from '../../constants/number';

interface Props {
  lastPage: number;
  currentPage: number;
  onPageChange: (nextPage: number) => void;
}

function Pagination({ lastPage, currentPage, onPageChange }: Props): JSX.Element {
  const preCycleCnt = SHOW_PAGE_LIMIT * Math.floor((currentPage - 1) / SHOW_PAGE_LIMIT);
  const pageBtns = Array.from(
    { length: preCycleCnt + SHOW_PAGE_LIMIT > lastPage ? lastPage - preCycleCnt : SHOW_PAGE_LIMIT },
    (_, idx) => idx + 1 + preCycleCnt,
  ).map((page) => (
    <PageBtn
      activated={page === currentPage}
      disabled={page === currentPage}
      onClick={() => onPageChange(page)}
      key={page}
    >
      {page}
    </PageBtn>
  ));

  if (!lastPage) return <div />;

  return (
    <Container>
      <ArrowBtn type="button" position="left" onClick={() => onPageChange(1)} disabled={currentPage <= 1}>
        <FaAngleDoubleLeft size={20} />
      </ArrowBtn>
      <ArrowBtn type="button" position="left" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage <= 1}>
        <BiLeftArrow size={20} />
      </ArrowBtn>
      {pageBtns}
      <ArrowBtn
        type="button"
        position="right"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= lastPage}
      >
        <BiRightArrow size={20} />
      </ArrowBtn>
      <ArrowBtn
        type="button"
        position="right"
        onClick={() => onPageChange(lastPage)}
        disabled={currentPage >= lastPage}
      >
        <FaAngleDoubleRight size={20} />
      </ArrowBtn>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  padding-top: 20px;
`;

const PageBtn = styled.button<{ activated: boolean }>`
  width: 45px;
  height: 45px;
  margin: 0 5px;
  line-height: 45px;
  border-radius: 10px;
  background-color: ${({ activated, theme }) => (activated ? theme.color.pink : `transparent`)};
  ${({ activated, theme }) => (activated ? theme.fontStyle.bodyBold : theme.fontStyle.body)};
  transition: background-color 0.3s;
  &:disabled {
    cursor: unset;
    color: ${({ theme }) => theme.color.black};
  }
  &:hover {
    ${({ activated, theme }) => (activated ? '' : `background-color: ${theme.color.pink}`)};
  }
`;

const ArrowBtn = styled.button<{ position: 'left' | 'right' }>`
  height: 40px;
  margin-left: ${({ position }) => (position === 'left' ? 0 : `15px`)};
  margin-right: ${({ position }) => (position === 'right' ? 0 : `15px`)};
  opacity: 0.5;
  &:disabled {
    opacity: 1;
    cursor: unset;
  }
`;

export default memo(Pagination);
