import React from 'react';
import styled from 'styled-components';
import { Header } from '../../components';
import versusImg from '../../images/versus.png';

function Worldcup(): JSX.Element {
  const urlTemp1 = `https://scontent-gmp1-1.xx.fbcdn.net/v/t1.6435-9/146920428_262114008606476_1455088809082829943_n.jpg?_nc_cat=1&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=tsSadXCKx8YAX8w0xdy&_nc_ht=scontent-gmp1-1.xx&oh=eaf36c29001dc09ca3d5c07201a91611&oe=61AF4184`;
  const urlTemp2 = 'https://file2.nocutnews.co.kr/newsroom/image/2018/07/31/20180731101720215498_0_750_937.jpg';
  return (
    <Wrapper>
      <Header type="header" isLogin />
      <Container>
        <Title>아름다운 연예인 이상형 월드컵 1/32</Title>
        <Round>32강</Round>
        <ImageContainer>
          <img src={versusImg} alt="versus" />
          <Image imageUrl={urlTemp1} />
          <Image imageUrl={urlTemp2} />
        </ImageContainer>
        <NameContainer>
          <Name>한지민</Name>
          <Name>한효주</Name>
        </NameContainer>
      </Container>
    </Wrapper>
  );
}

const NameContainer = styled.div`
  width: 100%;
  align-self: center;
  display: flex;
  align-items: center;
  justify-content: space-around;
  ${({ theme }) => theme.fontStyle.h2Bold};
`;

const Name = styled.div`
  width: 150px;
  height: 70px;
  align-self: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  ${({ theme }) => theme.fontStyle.h2Bold};
  background-color: ${({ theme }) => theme.color.primary};
`;

const Round = styled.div`
  width: 150px;
  height: 70px;
  align-self: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  ${({ theme }) => theme.fontStyle.h2Bold};
  background-color: ${({ theme }) => theme.color.primary};
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
`;

const Title = styled.div`
  ${({ theme }) => theme.fontStyle.h1Bold}
  align-self:center;
  text-align: center;
  width: 90%;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 65vh;
  img {
    width: 20%;
    position: absolute;
    transform: translate(-50%, 0);
    left: 50%;
    align-self: center;
  }
`;

const Image = styled.div<{ imageUrl: string }>`
  width: 100%;
  background: url(${(props) => props.imageUrl});
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
`;

export default Worldcup;
