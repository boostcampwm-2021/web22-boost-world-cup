import React, { memo } from 'react';
import styled from 'styled-components';

interface Props {
  tabTitles: Array<string>;
  currentTab: number;
  onTabChange: (pressedTab: number) => void;
}

function TabBar({ tabTitles, currentTab, onTabChange }: Props): JSX.Element {
  return (
    <BtnsWrapper>
      {tabTitles.map((title, index) => {
        return (
          <TabBtn
            key={tabTitles.indexOf(title)}
            onClick={() => onTabChange(index + 1)}
            activated={currentTab === index + 1}
            index={index}
          >
            {title}
          </TabBtn>
        );
      })}
    </BtnsWrapper>
  );
}

const TabBtn = styled.button<{ activated: boolean; index: number }>`
  width: ${({ index }) => (index === 0 ? '300px' : '240px')};
  height: 60px;
  line-height: 74px;
  text-align: center;
  ${({ theme }) => theme.fontStyle.bodyBold};
  border: 1px solid ${({ theme }) => theme.color.primary};
  border-radius: 12px 12px 0 0;
  color: ${({ theme }) => theme.color.gray[3]};
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

export default memo(TabBar);
