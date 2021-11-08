import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import selectImg from '../../images/select.png';

interface Props {
  round: number;
  possibleRound: string[];
  roundSelector: (newRound: number) => void;
}

function RoundSelector({ round, possibleRound, roundSelector }: Props): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const toggleHandler = useCallback(() => {
    setIsOpen((v) => !v);
  }, []);

  const clickBackWindow = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setIsOpen((v) => !v);
    event.stopPropagation();
  }, []);

  return (
    <>
      <RoundInput onClick={toggleHandler}>
        <span>{possibleRound[round]}강</span>
        <img src={selectImg} alt="select" width="20px" height="20px" />
        <RoundList isOpen={isOpen}>
          {possibleRound.map((round, idx) => (
            <Item onClick={() => roundSelector(idx)}>{round}강</Item>
          ))}
        </RoundList>
      </RoundInput>
      <BackWindow onClick={clickBackWindow} isOpen={isOpen} />
    </>
  );
}

const BackWindow = styled.div<{ isOpen: boolean }>`
  position: fixed;
  background-color: transparent;
  width: 100%;
  height: 100%;
  z-index: 2;
  top: 0;
  left: 0;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`;

const RoundInput = styled.div`
  display: flex;
  width: 100%;
  height: 49px;
  background-color: ${({ theme }) => theme.color.white};
  ${({ theme }) => theme.fontStyle.bodyBold}
  align-items: center;
  padding-left: 3%;
  padding-right: 3%;
  justify-content: space-between;
  cursor: pointer;
`;

const RoundList = styled.div<{ isOpen: boolean }>`
  position: absolute;
  width: 80%;
  top: 68.5%;
  left: 10%;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  margin: 10px 0;
  ${({ theme }) => theme.fontStyle.h3}
  color: ${({ theme }) => theme.color.gray[0]};
  background-color: ${({ theme }) => theme.color.white};
  z-index: 3;
  border-radius: 5px;
`;

const Item = styled.div`
  padding-top: 5px;
  display: flex;
  align-items: center;
  padding-left: 4%;
  height: 51px;
  &:last-child {
    border-bottom: 0;
  }
`;

export default RoundSelector;
