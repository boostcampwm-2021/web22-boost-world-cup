import React from 'react';
import styled from 'styled-components';

type Props = {
  mark: JSX.Element;
  contents: string;
};

const GithubLoginButton = ({ mark, contents }: Props): JSX.Element => {
  return (
    <Container>
      {mark}
      <span>{contents}</span>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  padding-left: 20px;
  font-size: 32px;
  width: 390px;
  height: 61px;
  background-color: ${({ theme }) => theme.color.primary};
  span {
    padding-left: 20px;
    position: relative;
    top: 2px;
    font-size: 28px;
  }
`;

export default GithubLoginButton;
