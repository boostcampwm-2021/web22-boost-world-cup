import React from 'react';
import styled from 'styled-components';

interface Props {
  tabTitle: Array<string>;
  currentTab: number;
  onTabChange: (pressedTab: number) => void;
}

function TabBar({ tabTitle, currentTab, onTabChange }: Props): JSX.Element {
  return (
    <BtnsWrapper>
      {tabTitle.map((title, index) => {
        return (
          <TabBtn
            key={tabTitle.indexOf(title)}
            activated={currentTab === index + 1}
            onClick={() => onTabChange(index + 1)}
          >
            {title}
          </TabBtn>
        );
      })}
    </BtnsWrapper>
  );
}

const TabBtn = styled.button<{ activated: boolean }>`
  width: 330px;
  height: 74px;
  line-height: 74px;
  text-align: center;
  ${({ theme }) => theme.fontStyle.h3Bold};
  border: 1px solid ${({ theme }) => theme.color.primary};
  border-radius: 12px 12px 0 0;
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

export default TabBar;
