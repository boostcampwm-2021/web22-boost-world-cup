import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Comment from './comment';
import { CommentData } from '../../types/Datas';
import Loader from '../Loader';
import { getCommentsCount } from '../../utils/api/comment';
import useApiRequest, { REQUEST } from '../../hooks/useApiRequest';

interface Props {
  worldcupId: string;
  comments: CommentData[];
  isLoading: boolean;
  observeTarget: React.MutableRefObject<HTMLDivElement | null>;
  isClickMore: boolean;
  setComments: React.Dispatch<React.SetStateAction<CommentData[]>>;
  onClickMoreBtn: React.MouseEventHandler;
}

function CommentList({
  worldcupId,
  comments,
  isLoading,
  observeTarget,
  isClickMore,
  setComments,
  onClickMoreBtn,
}: Props): JSX.Element {
  const [commentCount, setCommentCount] = useState(0);
  const onGetCommentCountSuccess = (count: number) => setCommentCount(count);
  const getCommnetCountDispatcher = useApiRequest(getCommentsCount, onGetCommentCountSuccess);

  useEffect(() => {
    getCommnetCountDispatcher({ type: REQUEST, requestProps: [worldcupId] });
  }, [comments.length]);

  return (
    <Wrapper>
      <Text>댓글 ({commentCount})</Text>
      <CommentContainer>
        {comments.map((comment) => (
          <Comment key={comment.commentId} comment={comment} setComments={setComments} />
        ))}
      </CommentContainer>
      {!isClickMore && (
        <MoreButton onClick={onClickMoreBtn}>
          <Title>더보기</Title>
        </MoreButton>
      )}
      <div ref={observeTarget} style={{ width: '10px', height: '10px' }}>
        {isLoading && <Loader />}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
`;

const Text = styled.div`
  ${({ theme }) => theme.fontStyle.bodyBold};
  margin-bottom: 10px;
`;

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 10px;
  padding: 7px 13px 7px 10px;
  width: 100%;
`;

const MoreButton = styled.div`
  width: 100%;
  height: 5em;
  line-height: 3em;
  text-align: center;
  margin-top: 2em;
  margin-bottom: 2em;
  padding-top: 1em;
`;

const Title = styled.p`
  margin: auto;
  background-color: ${({ theme }) => theme.color.lightpink};
  color: ${({ theme }) => theme.color.gray[0]};
  width: 30em;
  height: 3em;
  border-radius: 12px;
  cursor: pointer;
  transition: all 300ms ease-in;
  &:hover {
    background-color: ${({ theme }) => theme.color.pink};
    color: ${({ theme }) => theme.color.gray[2]};
  }
`;

export default CommentList;
