import React from 'react';
import styled from 'styled-components';

interface Props {
  name: string;
  onClickHandler: () => void;
  color: any;
}

const Button = ({ name, onClickHandler, color }: Props): JSX.Element => {
  return (
    <Container onClick={onClickHandler} color={color}>
      {name}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.color};
  width: 145px;
  height: 45px;
  border-radius: 10px;
  cursor: pointer;
`;

export default Button;
