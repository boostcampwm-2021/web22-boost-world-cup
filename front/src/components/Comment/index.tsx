import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { createComment, getComments } from '../../utils/api/comment';
import { CommentData } from '../../types/Datas';
import CommentList from '../CommentList';

interface Props {
  worldcupId: string;
}

function Comment({ worldcupId }: Props): JSX.Element {
  const [message, setMessage] = useState('');
  const [comments, setComments] = useState<CommentData[]>([]);
  const [offset, setOffset] = useState(0);

  const onSubmit = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      if (message === '') {
        return;
      }
      setMessage('');
      const { nickname, createdAt, message: newMessage } = await createComment(worldcupId, message);
      setComments([{ message: newMessage, createdAt, nickname }, ...comments]);
    },
    [comments, message],
  );

  const commentChangeEvent = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const {
        target: { value },
      } = event;
      setMessage(value);
    },
    [message],
  );

  return (
    <Wrapper>
      <InputContainer>
        <Text>나의 한마디</Text>
        <CommentInput placeholder="메시지를 입력하세요." onChange={commentChangeEvent} value={message} />
        <SubmitButton onClick={onSubmit}>확인</SubmitButton>
      </InputContainer>
      <CommentList
        worldcupId={worldcupId}
        comments={comments}
        offset={offset}
        setOffset={setOffset}
        setComments={setComments}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 260px;
`;

const Text = styled.div`
  ${({ theme }) => theme.fontStyle.bodyBold};
`;

const InputContainer = styled.form`
  display: flex;
  flex-direction: column;
`;

const CommentInput = styled.input`
  ${({ theme }) => theme.fontStyle.body}
  background-color: ${({ theme }) => theme.color.white};
  padding-left: 32px;
  width: 50%;
  height: 61px;
  border: 0;
  border-radius: 10px;
`;

const SubmitButton = styled.button`
  ${({ theme }) => theme.fontStyle.body}
  background-color: ${({ theme }) => theme.color.pink};
  width: 100px;
  height: 60px;
  border: 0;
  border-radius: 10px;
`;

export default Comment;
