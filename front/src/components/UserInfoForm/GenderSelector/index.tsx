import React, { useCallback } from 'react';
import styled from 'styled-components';

interface Props {
  gender: number;
  setGender: React.Dispatch<React.SetStateAction<number>>;
}

function GenderSelector({ gender, setGender }: Props): JSX.Element {
  const genderSelectHandler: React.MouseEventHandler = useCallback((event: React.MouseEvent<HTMLElement>) => {
    const {
      dataset: { value },
    } = event.target as HTMLElement;
    if (value) {
      setGender(parseInt(value, 10));
    }
  }, []);

  return (
    <>
      <GenderContainer>
        <Male onClick={genderSelectHandler} gender={gender} data-value="1">
          남자
        </Male>
        <Female onClick={genderSelectHandler} gender={gender} data-value="2">
          여자
        </Female>
      </GenderContainer>
    </>
  );
}

const GenderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 61px;
`;

const Male = styled.div<{ gender: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ theme }) => theme.fontStyle.h3}
  color: ${({ theme }) => theme.color.gray[0]};
  background-color: ${({ theme, gender }) => (gender === 1 ? theme.color.pink : theme.color.primary)};
  height: 100%;
  width: 186px;
  border-radius: 10px;
  cursor: pointer;
`;

const Female = styled.div<{ gender: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ theme }) => theme.fontStyle.h3}
  color: ${({ theme }) => theme.color.gray[0]};
  background-color: ${({ theme, gender }) => (gender === 2 ? theme.color.pink : theme.color.primary)};
  height: 100%;
  width: 186px;
  border-radius: 10px;
  cursor: pointer;
`;

export default GenderSelector;
