import React from 'react';
import styled from 'styled-components';

interface BarProps {
  data: {
    male: number;
    female: number;
  };
}
function BarChart({ data }: BarProps): JSX.Element {
  const COLORS = ['#84bd00', '#efdf00'];
  return (
    <>
      <svg width="100%" height="65px">
        <defs>
          <linearGradient id="barChart">
            <stop offset="0" stopColor={COLORS[0]}>
              <animate dur="1s" attributeName="offset" fill="freeze" from="0" to={data.male} />
            </stop>
            <stop offset="0" stopColor={COLORS[1]}>
              <animate dur="1s" attributeName="offset" fill="freeze" from="0" to={data.female} />
            </stop>
          </linearGradient>
        </defs>
        <rect id="Rectangle" x="0" y="0" width="300" height="30" rx="8" fill="url(#barChart)" />
      </svg>
      <BarLabel>
        <BarDesc color={COLORS[6]}>
          <div />
          <span>Male</span>
          <p>{(data.male * 100).toFixed(0)}%</p>
        </BarDesc>
        <BarDesc color={COLORS[7]}>
          <div />
          <span>Female</span>
          <p>{(data.female * 100).toFixed(0)}%</p>
        </BarDesc>
      </BarLabel>
    </>
  );
}
const BarLabel = styled.div`
  display: flex;
  width: 90%;
  justify-content: space-between;
  span {
    font-weight: bold;
  }
`;
const BarDesc = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0.2em;
  width: 50%;
  div {
    margin-right: -0.4em;
    background-color: ${(props) => props.color};
    width: 20px;
    height: 20px;
    border-radius: 50px;
  }
`;
export default BarChart;
