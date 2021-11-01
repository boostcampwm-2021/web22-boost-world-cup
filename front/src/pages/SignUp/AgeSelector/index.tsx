import React, { useState } from 'react';
import styled from 'styled-components';

type Props = {
  age: string;
  ageSelector: (newAge: string) => void;
};

const AgeSelector = ({ age, ageSelector }: Props): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const ages = ['10대', '20대', '30대', '40대', '50대', '그외'];

  const toggleHandler = (): void => {
    setIsOpen((v) => !v);
  };

  const ageSelectHandler = (age: string): void => {
    ageSelector(age);
    setIsOpen((v) => !v);
  };

  return (
    <>
      <AgeInput onClick={toggleHandler}>
        <span>{age || '연령'}</span>
        <AgeList isOpen={isOpen}>
          {ages.map((age) => (
            <Item onClick={() => ageSelectHandler(age)}>{age}</Item>
          ))}
        </AgeList>
      </AgeInput>
    </>
  );
};

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
  div {
    padding-top: 5px;
    display: flex;
    align-items: center;
    padding-left: 50px;
    height: 51px;
    border-bottom: 1px solid ${({ theme }) => theme.color.pink};
    &:last-child {
      border-bottom: 0;
    }
  }
`;

const Item = styled.div``;

export default AgeSelector;
