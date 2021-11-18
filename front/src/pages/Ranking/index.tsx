import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Header, RankingList, Comment } from '../../components';

interface Props {
  location: Location;
}

function Ranking({ location }: Props): JSX.Element {
  const worldcupId = useMemo(() => location.pathname.split('/')[2], [location]);
  return (
    <Wrapper>
      <Header type="header" />
      <RankingContent>
        <RankingList worldcupId={worldcupId} />
      </RankingContent>
      <Comment worldcupId={worldcupId} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: ${({ theme }) => theme.color.lightpink};
`;

const RankingContent = styled.div`
  position: relative;
  width: 90%;
  margin: 0 auto;
  margin-top: 100px;
  padding: 2em 0;
  background: rgb(245, 220, 216);
  background: linear-gradient(0deg, rgba(245, 220, 216, 1) 37%, rgba(210, 128, 120, 1) 100%);
  border-radius: 10px;
`;

export default Ranking;
