import React from 'react';
import styled from 'styled-components';
import { Header } from '../../components';
import { candidateData } from '../../types/Datas';
import trophyImg from '../../images/winner.png';

interface Props {
  winCandidate: candidateData | undefined;
  title: string;
}

function Gameover({ winCandidate, title }: Props): JSX.Element {
  return (
    <Wrapper>
      <Header type="header" isLogin />
      <Container>
        <img src={trophyImg} alt="trophy" />
        <Title>{title} 우승!</Title>
        <Winner imageUrl={winCandidate ? winCandidate.url : ''} />
      </Container>
    </Wrapper>
  );
}

const Winner = styled.div<{ imageUrl: string }>`
  width: 1000px;
  height: 1000px;
  background: url(${({ imageUrl }) => imageUrl});
  background-size: 900px 800px;
  background-repeat: no-repeat;
  background-position: center;
  align-self: center;
`;

const Wrapper = styled.div`
  height: 100vh;
  background-color: ${({ theme }) => theme.color.lightpink};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 2%;
  img {
    position: absolute;
    align-self: center;
    top: 200px;
  }
`;

const Title = styled.div`
  ${({ theme }) => theme.fontStyle.h1Bold}
  align-self:center;
  text-align: center;
  width: 90%;
`;

export default Gameover;
