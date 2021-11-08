import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import selectImg from '../../../images/select.png';

interface Props {
  round: number;
  roundSelector: (newRound: number) => void;
}

function RoundSelector({ round, roundSelector }: Props): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const rounds = ['4강', '8강', '16강', '32강', '64강', '128강'];

  const toggleHandler = useCallback(() => {
    setIsOpen((v) => !v);
  }, []);

  const selectedRoundText = () => {
    return round === 0 ? '라운드' : rounds[round - 1];
  };

  const clickBackWindow = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setIsOpen((v) => !v);
    event.stopPropagation();
  }, []);

  return (
    <>
      <RoundInput onClick={toggleHandler}>
        <span>{selectedRoundText()}</span>
        <img src={selectImg} alt="select" width="20px" height="20px" />
        <RoundList isOpen={isOpen}>
          {rounds.map((age, idx) => (
            <Item onClick={() => roundSelector(idx + 1)}>{age}</Item>
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
  top: 47%;
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
