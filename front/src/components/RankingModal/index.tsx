import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

function RankingModal(): JSX.Element {
  const data = [200, 150, 50, 30, 40, 50, 30, 50];
  const ageData = data.slice(3);
  const ageAcc = ageData.map((value) => value / data[0]);
  const svgRef = useRef<SVGSVGElement>(null);
  const color = ['#AED6F1 ', '#5DADE2', '#2E86C1', '#21618C', '#212F3C'];
  const getCoordCircle = (percent: number) => {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
  };
  useEffect(() => {
    let acc = 0;
    ageData.map((value, index) => {
      const [startX, startY] = getCoordCircle(acc);
      const ratio = value / data[0];
      acc += ratio;
      const [endX, endY] = getCoordCircle(acc);
      const isLargeArc = ratio > 0.5 ? 1 : 0;
      const targetRad = 2 * Math.PI * ratio;
      const targetRestRad = 2 * Math.PI * (1 - ratio);
      const animationDuration = 0.2;

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', `M ${startX} ${startY} A 1 1 0 ${isLargeArc} 1 ${endX} ${endY} L 0 0`);
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke-width', '0.4');
      path.setAttribute('stroke', color[index]);
      path.setAttribute('stroke-dasharray', `${targetRad} ${targetRestRad}`);
      path.setAttribute('stroke-dashoffset', `${targetRad}`);

      const animate = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
      animate.setAttribute('attributeName', 'stroke-dashoffset');
      animate.setAttribute('begin', `${animationDuration * index}`);
      animate.setAttribute('from', `${targetRad}`);
      animate.setAttribute('to', '0.015');
      animate.setAttribute('dur', `${animationDuration}`);
      animate.setAttribute('fill', 'freeze');
      path.appendChild(animate);

      (svgRef.current as SVGSVGElement).appendChild(path);
      return path;
    });
  }, []);
  return (
    <Modal>
      <Doughnut>
        <Svg width="300" height="300" viewBox="-1.5 -1.5 3 3" ref={svgRef} />
        <DoughnutLabel>
          {ageAcc.map((value, index) => {
            return (
              <DescRow color={color[index]}>
                <div />
                <span>{(index + 1) * 10}대</span>
                <span>{(value * 100).toFixed(0)}%</span>
              </DescRow>
            );
          })}
        </DoughnutLabel>
      </Doughnut>
      <Line />
    </Modal>
  );
}
const Modal = styled.div`
  position: absolute;
  top: 10em;
  left: 20vw;
  display: flex;
  width: 50vw;
  height: 30vh;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  border-radius: 12px;
`;
const Doughnut = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 100%;
  width: 50%;
`;
const Svg = styled.svg`
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
  width: 40%;
  height: 100%;
`;
const DescRow = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 0.6em;
  div {
    margin-right: -1em;
    background-color: ${(props) => props.color};
    width: 20px;
    height: 20px;
    border-radius: 50px;
  }
`;
const Line = styled.section``;
export default RankingModal;
