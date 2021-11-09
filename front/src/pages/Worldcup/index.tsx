import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { Header } from '../../components';
import versusImg from '../../images/versus.png';

function Worldcup(): JSX.Element {
  const urlTemp1 = `https://scontent-gmp1-1.xx.fbcdn.net/v/t1.6435-9/146920428_262114008606476_1455088809082829943_n.jpg?_nc_cat=1&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=tsSadXCKx8YAX8w0xdy&_nc_ht=scontent-gmp1-1.xx&oh=eaf36c29001dc09ca3d5c07201a91611&oe=61AF4184`;
  const urlTemp2 = 'https://file2.nocutnews.co.kr/newsroom/image/2018/07/31/20180731101720215498_0_750_937.jpg';

  const [select, setSelect] = useState(0);

  const temp = (event: React.MouseEvent<HTMLElement>) => {
    setSelect(1);
  };
  const temp2 = (event: React.MouseEvent<HTMLElement>) => {
    setSelect(2);
  };

  return (
    <Wrapper>
      <Header type="header" isLogin />
      <Container>
        <Title>아름다운 연예인 이상형 월드컵 1/32</Title>
        <Round>32강</Round>
        <ImageContainer select={select}>
          <img src={versusImg} alt="versus" />
          <LeftImage imageUrl={urlTemp1} select={select} onClick={temp} />
          <RightImage imageUrl={urlTemp2} select={select} onClick={temp2} />
        </ImageContainer>
        <NameContainer>
          <LeftName select={select}>한지민</LeftName>
          <RightName select={select}>한효주</RightName>
        </NameContainer>
      </Container>
    </Wrapper>
  );
}

const ImageContainer = styled.div<{ select: number }>`
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
    display: ${({ select }) => (select === 0 ? 'block' : 'none')};
  }
`;

const selected = keyframes`
  from {
    width:100%;
  }
  to {
    width:0%;
  }
`;

const LeftImage = styled.div<{ imageUrl: string; select: number }>`
  width: 100%;
  background: url(${({ imageUrl }) => imageUrl});
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
  animation: ${({ select }) =>
    select === 2
      ? css`
          ${selected} 1s ease-in-out forwards; ;
        `
      : css``};
`;

const RightImage = styled.div<{ imageUrl: string; select: number }>`
  width: 100%;
  background: url(${(props) => props.imageUrl});
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
  animation: ${({ select }) =>
    select === 1
      ? css`
          ${selected} 1s ease forwards; ;
        `
      : css``};
`;

const RightName = styled.div<{ select: number }>`
  width: 150px;
  height: 70px;
  align-self: center;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  ${({ theme }) => theme.fontStyle.h2Bold};
  background-color: ${({ theme }) => theme.color.primary};
  display: ${({ select }) => (select === 1 ? 'none' : 'flex')};
`;

const LeftName = styled.div<{ select: number }>`
  width: 150px;
  height: 70px;
  align-self: center;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  ${({ theme }) => theme.fontStyle.h2Bold};
  background-color: ${({ theme }) => theme.color.primary};
  display: ${({ select }) => (select === 2 ? 'none' : 'flex')};
`;

const NameContainer = styled.div`
  width: 100%;
  align-self: center;
  display: flex;
  align-items: center;
  justify-content: space-around;
  ${({ theme }) => theme.fontStyle.h2Bold};
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

export default Worldcup;
