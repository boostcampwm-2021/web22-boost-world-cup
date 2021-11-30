import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaHome, FaList } from 'react-icons/fa';
import { Header } from '../../components';
import { candidateData } from '../../types/Datas';
import trophyImg from '../../images/winner.png';
import getImgURL from '../../utils/getImgURL';
import { MAIN } from '../../constants/route';

interface Props {
  winCandidate?: candidateData;
  title?: string;
  worldcupId?: string;
}

function Gameover({ winCandidate, title, worldcupId }: Props): JSX.Element {
  return (
    <Wrapper>
      <Header />
      <Container>
        <img src={trophyImg} alt="trophy" />
        <Title>{title || ''} 우승!</Title>
        <Winner imageUrl={winCandidate ? getImgURL(winCandidate.imgKey) : ''} />
        <Name>{winCandidate?.name}</Name>
        <ButtonContainer>
          <Link to={`/ranking/${worldcupId || ''}`}>
            <Button>
              <FaList />
              <span>랭킹보기</span>
            </Button>
          </Link>
          <Link to={MAIN}>
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

const Name = styled.div`
  position: absolute;
  left: 50%;
  top: 160px;
  height: 40px;
  transform: translate(-50%);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  padding: 0px 10px 0px 10px;
  background-color: ${({ theme }) => theme.color.primary};
  ${({ theme }) => theme.fontStyle.bodyBold};
`;

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
  width: 600px;
  height: 500px;
  margin-top: 50px;
  margin-bottom: 100px;
  background: url(${({ imageUrl }) => imageUrl});
  background-size: contain;
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
    top: 160px;
    width: 650px;
  }
`;

const Title = styled.div`
  ${({ theme }) => theme.fontStyle.h2Bold}
  align-self:center;
  text-align: center;
  width: 90%;
`;

export default Gameover;
