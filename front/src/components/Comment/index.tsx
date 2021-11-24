import React, { useCallback, useState, useContext } from 'react';
import styled from 'styled-components';
import { createComment, getComments } from '../../utils/api/comment';
import { CommentData } from '../../types/Datas';
import CommentList from '../CommentList';
import { useInfiniteScroll } from '../../hooks';
import { UserStateContext } from '../../stores/userStore';

interface Props {
  worldcupId: string;
}

function Comment({ worldcupId }: Props): JSX.Element {
  const { isLoggedIn } = useContext(UserStateContext);
  const [message, setMessage] = useState('');
  const {
    items: comments,
    target,
    isLoading,
    isClickMore,
    onClickMoreBtn,
    setItems: setComments,
  } = useInfiniteScroll<CommentData>(10, getComments, [worldcupId]);

  const onSubmit = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      const trimMessage = message.trim();
      if (trimMessage === '') {
        setMessage('');
        return;
      }
      setMessage('');
      const {
        commentId,
        userId,
        nickname,
        createdAt,
        message: newMessage,
      } = await createComment(worldcupId, trimMessage);
      setComments([{ commentId, userId, nickname, createdAt, message: newMessage }, ...comments]);
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
        {isLoggedIn ? (
          <CommentInput placeholder="메시지를 입력하세요." onChange={commentChangeEvent} value={message} />
        ) : (
          <CommentInput placeholder="로그인이 필요합니다." onChange={commentChangeEvent} value={message} disabled />
        )}

        <SubmitButton onClick={onSubmit}>확인</SubmitButton>
      </InputContainer>
      <CommentList
        worldcupId={worldcupId}
        comments={comments}
        isLoading={isLoading}
        observeTarget={target}
        setComments={setComments}
        isClickMore={isClickMore}
        onClickMoreBtn={onClickMoreBtn}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 50px;
  background-color: ${({ theme }) => theme.color.lightpink};
`;

const InputContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 60%;
`;

const Text = styled.div`
  margin-bottom: 10px;
  ${({ theme }) => theme.fontStyle.bodyBold};
`;

const CommentInput = styled.input`
  ${({ theme }) => theme.fontStyle.body}
  background-color: ${({ theme }) => theme.color.white};
  padding-left: 3%;
  padding-right: 3%;
  height: 61px;
  border: 0;
  border-radius: 10px;
`;

const SubmitButton = styled.button`
  margin-top: 5px;
  width: 60px;
  height: 30px;
  border: 0;
  border-radius: 5px;
  align-self: end;
  ${({ theme }) => theme.fontStyle.body}
  background-color: ${({ theme }) => theme.color.primary};
`;

export default Comment;
