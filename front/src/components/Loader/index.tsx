import React from 'react';
import ReactLoading from 'react-loading';
import styled from 'styled-components';

function Loader(): JSX.Element {
  return (
    <LoaderWrap>
      <ReactLoading type="spin" color="#D28078" />
    </LoaderWrap>
  );
}

const LoaderWrap = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Loader;
