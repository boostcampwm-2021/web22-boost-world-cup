import React, { useCallback } from 'react';
import styled from 'styled-components';
import { MALE, FEMALE } from '../../../constants/number';

interface Props {
  gender: number;
  setGender: React.Dispatch<React.SetStateAction<number>>;
}

function GenderSelector({ gender, setGender }: Props): JSX.Element {
  const onGenderSelect = useCallback((gender: number): React.MouseEventHandler => {
    return () => setGender(gender);
  }, []);

  return (
    <>
      <GenderContainer>
        <Male onClick={onGenderSelect(MALE)} gender={gender}>
          남자
        </Male>
        <Female onClick={onGenderSelect(FEMALE)} gender={gender}>
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
