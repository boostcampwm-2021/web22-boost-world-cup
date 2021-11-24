import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../../components/Header';
import '@fontsource/rancho';
import leftLogo from '../../images/404logo_1.png';
import rightLogo from '../../images/404logo_2.png';

const NotFound = (): JSX.Element => {
  return (
    <Container>
      <Header type="header" />
      <Content>
        <h1>
          <LeftLogo src={leftLogo} alt="404_1" />
          <RightLogo src={rightLogo} alt="404_2" />
          404 NOT FOUND
        </h1>
        <p>We couldn&#39;t find that page.</p>
        <p>
          Go to <Link to="/main">Home page</Link>
        </p>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  height: 1080px;
  background-color: ${({ theme }) => theme.color.background};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 70px;
  font-family: Rancho;

  h1 {
    position: relative;
    margin: 240px 0 80px 0;
  }

  a {
    color: #5d5fef;
  }
`;

const LeftLogo = styled.img`
  position: absolute;
  width: 280px;
  left: -100px;
  top: -170px;
`;

const RightLogo = styled.img`
  position: absolute;
  width: 280px;
  right: -100px;
  top: -180px;
`;

export default NotFound;
