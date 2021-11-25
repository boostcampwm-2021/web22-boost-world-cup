import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { InfoData, DoughnutChartData } from '../../types/Datas';
import DoughnutChart from './DoughnutChart';
import BarChart from './BarChart';

interface ModalProps {
  info: InfoData;
  closeModal: (event: React.MouseEvent<Element>) => void;
}
function RankingModal({ closeModal, info }: ModalProps): JSX.Element {
  const [doughnutInfo, setDoughnutInfo] = useState<DoughnutChartData[]>([]);
  const { id, name, male, female, ...age } = info;
  const getCoordCircle = (percent: number) => {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
  };
  const makeDoughnutInfo = useCallback((rankingInfoData: number[]) => {
    let acc = 0;
    return rankingInfoData.map((value) => {
      const [startX, startY] = getCoordCircle(acc);
      acc += value;
      const [endX, endY] = getCoordCircle(acc);
      const isLargeArc = value > 0.5 ? 1 : 0;
      const targetArc = 2 * Math.PI * value;
      return { value, startX, startY, endX, endY, isLargeArc, targetArc };
    });
  }, []);
  useEffect(() => {
    setDoughnutInfo(makeDoughnutInfo(Object.values(age)));
  }, []);
  return (
    <Modaloverlay onClick={closeModal}>
      <Modal>
        <Header>
          <span>{info.name}</span>
        </Header>
        {doughnutInfo.length ? (
          <Content>
            <Doughnut>
              <DoughnutChart data={doughnutInfo} />
            </Doughnut>
            <Bar>
              <BarChart data={{ male, female }} />
            </Bar>
          </Content>
        ) : (
          <EmptyModal>
            <p>기록된 랭킹 기록이 없습니다.</p>
          </EmptyModal>
        )}
      </Modal>
    </Modaloverlay>
  );
}
const Modaloverlay = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;
const Modal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -30%);
  width: 800px;
  height: 450px;
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
  padding: 20px 40px 30px 40px;
  border-bottom: 1px solid gray;
  span {
    font-size: 1.2em;
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
const Bar = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90%;
`;
const EmptyModal = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2em;
`;
export default RankingModal;
