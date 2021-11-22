import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { DoughnutChartData } from '../../../types/Datas';

interface DoughnutProps {
  data: DoughnutChartData[];
}
function DoughnutChart({ data }: DoughnutProps): JSX.Element {
  const COLORS = ['#212F3C', '#21618C', '#2E86C1', '#5DADE2 ', '#AED6F1 ', '#F0FFFF', '#84bd00', '#efdf00'];
  const DURATION = 0.3;
  let count = -1;

  return (
    <>
      <DoughnutSvg id="gender" width="300" height="300" viewBox="-1.5 -1.5 3 3">
        {data.map((value, index) => {
          count += 1;
          return (
            value.value > 0 && (
              <path
                d={`M ${value.startX} ${value.startY} A 1 1 0 ${value.isLargeArc} 1 ${value.endX} ${value.endY}`}
                fill="none"
                strokeWidth="0.4"
                stroke={COLORS[index]}
                strokeDasharray={`${value.targetArc} ${value.restArc}`}
                strokeDashoffset={value.targetArc}
              >
                <animate
                  attributeName="stroke-dashoffset"
                  begin={DURATION * count}
                  from={value.targetArc}
                  to="0.02"
                  dur={DURATION}
                  fill="freeze"
                />
              </path>
            )
          );
        })}
        )
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
