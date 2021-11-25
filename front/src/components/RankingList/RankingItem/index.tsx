import React from 'react';
import styled from 'styled-components';
import Image from '../../Image';

interface ItemProps {
  id: number;
  imgKey: string;
  name: string;
  victoryRatio: number;
  winRatio: number;
  onClick: React.MouseEventHandler;
}
interface RatioProp {
  width: number;
  color: string;
}

function RankingItem({ id, imgKey, name, victoryRatio, winRatio, onClick }: ItemProps): JSX.Element {
  return (
    <Section>
      <LeftSection onClick={onClick}>
        <span>{id}</span>
        <Image width={50} height={50} imgKey={imgKey} />
        <p>{name}</p>
        <div />
      </LeftSection>
      <RightSection>
        <Bar>
          <Ratio width={victoryRatio} color="#e53238" />
          <span>{`${(victoryRatio * 100).toFixed(2)}%`}</span>
        </Bar>
        <Bar>
          <Ratio width={winRatio} color="#0064d2" />
          <span>{`${(winRatio * 100).toFixed(2)}%`}</span>
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
  font-size: 1.2em;
  margin-bottom: 0.5em;
`;
const LeftSection = styled.div`
  width: 40%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  cursor: pointer;
  img {
    width: 50px;
    height: 50px;
  }
  p {
    width: 150px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
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
  height: 36px;
  line-height: 36px;
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
  border-radius: ${(props: RatioProp) => (props.width === 1 ? `12px` : `12px 0 0 12px`)};
  width: ${(props: RatioProp) => `${props.width * 100}%`};
  height: 36px;
  background-color: ${(props: RatioProp) => `${props.color}`};
  opacity: 0.8;
`;
export default RankingItem;
