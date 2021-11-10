import React from 'react';
import styled from 'styled-components';
import { Header } from '../../components';
import { candidateData, gameInfoData } from '../../types/Datas';

interface Props {
  winCandidate: candidateData | undefined;
  title: string;
}

function Gameover({ winCandidate, title }: Props): JSX.Element {
  return (
    <Wrapper>
      <Header type="header" isLogin />
      <Container>
        <Title>{title} 우승!</Title>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100vh;
  background-color: ${({ theme }) => theme.color.lightpink};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 2%;
`;

const Title = styled.div`
  ${({ theme }) => theme.fontStyle.h1Bold}
  align-self:center;
  text-align: center;
  width: 90%;
`;

export default Gameover;
