import React, { useCallback } from 'react';
import styled from 'styled-components';
import { CommentData } from '../../types/Datas';

interface Props {
  comment: CommentData;
}

function Comment({ comment }: Props): JSX.Element {
  const getDateString = useCallback((date: string) => {
    const yymmdd = date.split('T')[0];
    const hhmmss = date.split('T')[1].split('.')[0];
    return `${yymmdd} ${hhmmss}`;
  }, []);

  return (
    <Wrapper>
      <SubContainer>
        <Writer>{comment.nickname}</Writer>
        <Date>{getDateString(comment.createdAt)}</Date>
      </SubContainer>
      <Message>{comment.message}</Message>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const SubContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Writer = styled.div`
  ${({ theme }) => theme.fontStyle.bodyBold};
`;
const Date = styled.div`
  ${({ theme }) => theme.fontStyle.body};
`;
const Message = styled.div`
  ${({ theme }) => theme.fontStyle.body};
`;

export default Comment;
