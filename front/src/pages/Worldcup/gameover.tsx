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
}

function Gameover({ winCandidate, title }: Props): JSX.Element {
  return (
    <Wrapper>
      <Header type="header" isLogin />
      <Container>
        <img src={trophyImg} alt="trophy" />
        <Title>{title} 우승!</Title>
        <Winner imageUrl={winCandidate ? winCandidate.url : ''} />
        <ButtonContainer>
          <Button>
            <FaList />
            <span>랭킹보기</span>
          </Button>
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
