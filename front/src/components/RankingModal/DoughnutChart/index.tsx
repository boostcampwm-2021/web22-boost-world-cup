import React from 'react';
import styled from 'styled-components';
import { DoughnutChartData } from '../../../types/Datas';

interface DoughnutProps {
  data: DoughnutChartData[];
}
function DoughnutChart({ data }: DoughnutProps): JSX.Element {
  const COLORS = ['#121152', '#003C84', '#0066AA', '#0090C0 ', '#00BAC4 ', '#00E2BB'];
  const DURATION = 0.3;

  return (
    <>
      <DoughnutSvg id="gender" width="300" height="300" viewBox="-1.5 -1.5 3 3">
        {data.map((value, index) => {
          return (
            <path
              key={value.id}
              d={`M ${value.startX} ${value.startY} A 1 1 0 ${value.isLargeArc} 1 ${value.endX} ${value.endY}`}
              fill="none"
              strokeWidth="0.4"
              stroke={COLORS[index]}
              strokeDasharray={`${value.targetArc}`}
              strokeDashoffset={value.targetArc}
            >
              <animate
                attributeName="stroke-dashoffset"
                begin={DURATION * index}
                from={value.targetArc}
                to="0"
                dur={DURATION}
                fill="freeze"
              />
            </path>
          );
        })}
        )
        <text textAnchor="middle" fontSize="0.35">
          gender
        </text>
      </DoughnutSvg>
      <DoughnutLabel>
        {data.map((value, index) => {
          return (
            <DoughnutDesc color={COLORS[index]}>
              <div />
              <span>{index < 5 ? `${(index + 1) * 10}대` : `기타`}</span>
              <p>{(value.value * 100).toFixed(0)}%</p>
            </DoughnutDesc>
          );
        })}
      </DoughnutLabel>
    </>
  );
}

export default DoughnutChart;

const DoughnutSvg = styled.svg`
  background-color: white;
  path {
    cursor: pointer;
    transition: all 300ms ease-in;
    &:hover {
      transform: scale(1.1);
      opacity: 0.6;
    }
  }
  text {
    font-family: cursive;
    font-weight: bold;
    fill: ${({ theme }) => theme.color.gray[0]};
  }
`;
const DoughnutLabel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60%;
  height: 40%;
  span {
    font-weight: bold;
  }
  p {
    width: 80px;
    text-align: center;
  }
`;
const DoughnutDesc = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 0.2em;
  div {
    margin-right: -1em;
    background-color: ${(props) => props.color};
    width: 20px;
    height: 20px;
    border-radius: 50px;
  }
`;
