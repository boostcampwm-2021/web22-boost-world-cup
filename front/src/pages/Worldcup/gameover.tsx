import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaHome, FaList } from 'react-icons/fa';
import { Header } from '../../components';
import { candidateData } from '../../types/Datas';
import trophyImg from '../../images/winner.png';

interface Props {
  winCandidate: candidateData | undefined;
  title: string;
  worldcupId: number;
}

function Gameover({ winCandidate, title, worldcupId }: Props): JSX.Element {
  return (
    <Wrapper>
      <Header type="header" isLogin />
      <Container>
        <img src={trophyImg} alt="trophy" />
        <Title>{title} 우승!</Title>
        <Winner imageUrl={winCandidate ? winCandidate.url : ''} />
        <ButtonContainer>
          <Link to={`/ranking/${worldcupId}`}>
            <Button>
              <FaList />
              <span>랭킹보기</span>
            </Button>
          </Link>
          <Link to="/main">
            <Button>
              <FaHome />
              <span>메인으로</span>
            </Button>
          </Link>
        </ButtonContainer>
      </Container>
    </Wrapper>
  );
}

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 350px;
  align-self: center;
  cursor: pointer;
  z-index: 1;
`;

const Button = styled.div`
  display: flex;
  flex-direction: row;
  width: 150px;
  height: 50px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.color.primary};
  font-size: 20px;
  align-items: center;
  justify-content: space-evenly;
  ${({ theme }) => theme.fontStyle.bodyBold};
`;

const Winner = styled.div<{ imageUrl: string }>`
  width: 500px;
  height: 500px;
  margin-top: 50px;
  margin-bottom: 100px;
  background: url(${({ imageUrl }) => imageUrl});
  background-size: 500px 500px;
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
  padding-top: 10px;
  img {
    position: absolute;
    align-self: center;
    top: 170px;
    width: 650px;
  }
`;

const Title = styled.div`
  ${({ theme }) => theme.fontStyle.h1Bold}
  align-self:center;
  text-align: center;
  width: 90%;
`;

export default Gameover;
