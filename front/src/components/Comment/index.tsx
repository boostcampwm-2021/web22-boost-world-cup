import React, { useState } from 'react';

import styled from 'styled-components';
import { createComment } from '../../utils/api/comment';

interface Props {
  worldcupId: string;
}

function Comment({ worldcupId }: Props): JSX.Element {
  const [comment, setComment] = useState('');

  const onSubmit = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setComment('');
    await createComment(worldcupId, comment);
  };

  const commentChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setComment(value);
  };

  return (
    <Wrapper>
      <InputContainer>
        <Text>나의 한마디</Text>
        <CommentInput placeholder="메시지를 입력하세요." onChange={commentChangeEvent} value={comment} />
        <SubmitButton onClick={onSubmit}>확인</SubmitButton>
      </InputContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 1312px;
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
