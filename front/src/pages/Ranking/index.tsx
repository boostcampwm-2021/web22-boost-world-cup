import React, { useState } from 'react';
import styled from 'styled-components';
import { Header, RankingList } from '../../components';

function Ranking(): JSX.Element {
  return (
    <>
      <Header type="header" />
      <RankingContent>
        <RankingList />
      </RankingContent>
    </>
  );
}

const RankingContent = styled.div`
  width: 90vw;
  margin: 0 auto;
  margin-top: 5em;
  padding: 2em 6em 2em 0;
  background-color: skyblue;
`;
export default Ranking;
