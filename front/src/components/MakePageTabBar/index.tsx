import React from 'react';
import styled from 'styled-components';

interface Props {
  currentTab: number;
  onTabChange: (pressedTab: number) => void;
}

function MakePageTabBar({ currentTab, onTabChange }: Props): JSX.Element {
  return (
    <BtnsWrapper>
      <TabBtn activated={currentTab === 1} onClick={() => onTabChange(1)}>
        1. 기본정보 수정 / 이미지 업로드
      </TabBtn>
      <TabBtn activated={currentTab === 2} onClick={() => onTabChange(2)}>
        2. 이미지 이름 수정 / 삭제
      </TabBtn>
    </BtnsWrapper>
  );
}

const TabBtn = styled.button<{ activated: boolean }>`
  width: 330px;
  height: 63px;
  line-height: 63px;
  text-align: center;
  ${({ theme }) => theme.fontStyle.h3Bold};
  color: #959595;
  background-color: ${({ activated, theme }) => (activated ? theme.color.primary : theme.color.white)};
  transition: background-color 0.3s, color 0.3s;
  &:hover {
    background-color: ${({ activated, theme }) => (activated ? theme.color.primary : theme.color.pink)};
    color: ${({ activated, theme }) => (activated ? '#959595' : theme.color.black)};
  }
`;

const BtnsWrapper = styled.div`
  display: flex;
`;

export default MakePageTabBar;
