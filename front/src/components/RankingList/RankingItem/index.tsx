import React from 'react';
import styled from 'styled-components';

interface ItemProps {
  id: number;
  url: string;
  name: string;
  winCnt: number;
  showCnt: number;
  victoryCnt: number;
  info: InfoType;
  handleClick: () => void;
}
interface InfoType {
  total: number;
  male: number;
  female: number;
  teens: number;
  twenties: number;
  thirties: number;
  forties: number;
  etc: number;
}
interface RatioProp {
  width: number;
}

function RankingItem({ id, url, name, winCnt, showCnt, victoryCnt, info, handleClick }: ItemProps): JSX.Element {
  return (
    <Section>
      <LeftSection onClick={handleClick}>
        <span>{id}</span>
        <img src={url} alt="월드컵 후보 사진" />
        <span>{name}</span>
        <div />
      </LeftSection>
      <RightSection>
        <Bar>
          <Ratio width={victoryCnt / showCnt} />
          <span>{`${((victoryCnt / showCnt) * 100).toFixed(2)}%`}</span>
        </Bar>
        <Bar>
          <Ratio width={winCnt / showCnt} />
          <span>{`${((winCnt / showCnt) * 100).toFixed(2)}%`}</span>
        </Bar>
      </RightSection>
    </Section>
  );
}

const Section = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 0 auto;
  font-size: 1.3em;
  margin-bottom: 1em;
`;
const LeftSection = styled.div`
  width: 40%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  cursor: pointer;
  img {
    width: 70px;
    height: 70px;
  }
`;
const RightSection = styled.div`
  width: 60%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
const Bar = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.color.lightpink};
  border-radius: 12px;
  width: 30%;
  height: 44px;
  line-height: 50px;
  margin-left: 1em;
  span {
    position: absolute;
    right: 0.5em;
    color: ${({ theme }) => theme.color.gray[0]};
  }
`;
const Ratio = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 12px;
  width: ${(props: RatioProp) => `${props.width * 100}%`};
  height: 44px;
  background-color: ${({ theme }) => theme.color.highlight};
  opacity: 0.8;
`;
export default RankingItem;
