import React from 'react';
import styled from 'styled-components';
import Loader from '../../components/Loader';

function Loading(): JSX.Element {
  return (
    <Wrapper>
      <Loader />;
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding-top: 30%;
`;

export default Loading;
