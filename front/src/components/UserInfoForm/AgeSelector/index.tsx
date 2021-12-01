import React, { useState, useCallback, useEffect, memo } from 'react';
import styled from 'styled-components';

interface Props {
  age: number;
  setAge: React.Dispatch<React.SetStateAction<number>>;
}

function AgeSelector({ age, setAge }: Props): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [age]);

  const onToggle = useCallback(() => {
    setIsOpen((v) => !v);
  }, []);

  const onAgeSelect = useCallback((age: number) => {
    setAge(age);
  }, []);

  const onBackgroundClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setIsOpen((v) => !v);
    event.stopPropagation();
  }, []);

  const ages = ['10대', '20대', '30대', '40대', '50대', '그외'];

  const selectedAgeText = () => {
    return age === 0 ? '연령' : ages[age - 1];
  };

  return (
    <>
      <AgeInput onClick={onToggle}>
        <span>{selectedAgeText()}</span>
        <AgeList isOpen={isOpen}>
          {ages.map((age, idx) => (
            <Item key={age} onClick={() => onAgeSelect(idx + 1)}>
              {age}
            </Item>
          ))}
        </AgeList>
      </AgeInput>
      <Background onClick={onBackgroundClick} isOpen={isOpen} />
    </>
  );
}

const Item = styled.div`
  padding-top: 5px;
  display: flex;
  align-items: center;
  padding-left: 50px;
  height: 51px;
  border-bottom: 1px solid ${({ theme }) => theme.color.pink};
  &:last-child {
    border-bottom: 0;
  }
`;

const Background = styled.div<{ isOpen: boolean }>`
  position: fixed;
  background-color: transparent;
  width: 100%;
  height: 100%;
  z-index: 2;
  top: 0;
  left: 0;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`;

const AgeInput = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  ${({ theme }) => theme.fontStyle.h3}
  background-color: ${({ theme }) => theme.color.primary};
  padding-left: 32px;
  width: 100%;
  height: 61px;
  border: 0;
  border-radius: 10px;
  span {
    color: ${({ theme }) => theme.color.gray[0]};
  }
  cursor: pointer;
`;

const AgeList = styled.div<{ isOpen: boolean }>`
  position: absolute;
  width: 100%;
  top: 70px;
  left: 0;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  margin: 10px 0;
  ${({ theme }) => theme.fontStyle.h3}
  color: ${({ theme }) => theme.color.gray[0]};
  background-color: ${({ theme }) => theme.color.primary};
  z-index: 3;
  border-radius: 10px;
`;

export default memo(AgeSelector);
