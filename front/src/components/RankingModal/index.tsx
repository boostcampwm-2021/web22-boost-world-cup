import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FaRegWindowClose } from 'react-icons/fa';
import { InfoData } from '../../types/Datas';

interface ModalProps {
  info: InfoData;
  handleClick: (event: React.MouseEvent<Element>) => void;
}
function RankingModal({ handleClick, info }: ModalProps): JSX.Element {
  const ageRatio = [
    info.teens / info.total,
    info.twenties / info.total,
    info.thirties / info.total,
    info.forties / info.total,
    info.etc / info.total,
  ];
  const genderRatio = [info.male / info.total, info.female / info.total];
  const svgRef = useRef<SVGSVGElement>(null);
  const color = ['#050f2c ', '#004b79', '#0091cd', '#56a0d3', '#c4dff6', '#84bd00', '#efdf00'];
  const getCoordCircle = (percent: number) => {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
  };
  useEffect(() => {
    let acc = 0;
    ageRatio.map((value, index) => {
      const [startX, startY] = getCoordCircle(acc);
      acc += value;
      const [endX, endY] = getCoordCircle(acc);
      const isLargeArc = value > 0.5 ? 1 : 0;
      const targetRad = 2 * Math.PI * value;
      const targetRestRad = 2 * Math.PI * (1 - value);
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
      <Header>
        <span>{info.name}</span>
        <FaRegWindowClose onClick={handleClick} />
      </Header>
      <Content>
        <Doughnut>
          <Svg width="300" height="300" viewBox="-1.5 -1.5 3 3" ref={svgRef} />
          <DoughnutLabel>
            {ageRatio.map((value, index) => {
              return (
                <DoughnutDesc color={color[index]}>
                  <div />
                  <span>{index < 4 ? `${(index + 1) * 10}대` : `기타`}</span>
                  <p>{(value * 100).toFixed(0)}%</p>
                </DoughnutDesc>
              );
            })}
          </DoughnutLabel>
        </Doughnut>
        <Bar>
          <svg width="100%" height="65px">
            <defs>
              <linearGradient id="left-to-right">
                <stop offset="0" stopColor={color[5]}>
                  <animate dur="1s" attributeName="offset" fill="freeze" from="0" to={genderRatio[0]} />
                </stop>
                <stop offset="0" stopColor={color[6]}>
                  <animate dur="1s" attributeName="offset" fill="freeze" from="0" to={genderRatio[0]} />
                </stop>
              </linearGradient>
            </defs>
            <rect id="Rectangle" x="0" y="0" width="300" height="30" rx="8" fill="url(#left-to-right)" />
          </svg>
          <BarLabel>
            <BarDesc color={color[5]}>
              <div />
              <span>Male</span>
              <p>{(genderRatio[0] * 100).toFixed(0)}%</p>
            </BarDesc>
            <BarDesc color={color[6]}>
              <div />
              <span>Female</span>
              <p>{(genderRatio[1] * 100).toFixed(0)}%</p>
            </BarDesc>
          </BarLabel>
        </Bar>
      </Content>
    </Modal>
  );
}
const Modal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -20%);
  width: 800px;
  height: 400px;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  padding-bottom: 2em;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
`;
const Header = styled.header`
  width: 100%;
  height: 20px;
  display: flex;
  justify-content: space-between;
  padding: 20px 40px 30px 40px;
  border-bottom: 1px solid gray;
  span {
    font-weight: bold;
  }
`;
const Content = styled.section`
  height: 100%;
  display: flex;
`;
const Doughnut = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 90%;
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
  width: 60%;
  height: 40%;
  span {
    font-weight: bold;
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
const Bar = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90%;
  svg {
    cursor: pointer;
    transition: all 300ms ease-in;
    &:hover {
      transform: scale(1.1);
      opacity: 0.7;
    }
  }
`;
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
export default RankingModal;
