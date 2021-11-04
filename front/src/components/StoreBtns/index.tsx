import React from 'react';
import styled from 'styled-components';

interface Props {
  onStore: React.MouseEventHandler<HTMLButtonElement>;
}

function StoreBtns({ onStore }: Props): JSX.Element {
  return (
    <BtnsWrapper>
      <Btn type="button">임시저장</Btn>
      <Btn type="button" onClick={onStore}>
        저장하기
      </Btn>
    </BtnsWrapper>
  );
}

const Btn = styled.button`
  background-color: ${({ theme }) => theme.color.primary};
  ${({ theme }) => theme.fontStyle.h3};
  width: 124px;
  height: 57px;
  border-radius: 10px;
  margin-left: 30px;
`;

const BtnsWrapper = styled.div`
  display: flex;
  margin-right: 296px;
  margin-top: 11px;
`;

export default StoreBtns;
