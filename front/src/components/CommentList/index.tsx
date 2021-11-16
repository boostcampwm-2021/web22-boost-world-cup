import React, { useRef, useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Comment from './comment';
import { CommentData } from '../../types/Datas';
import Loader from '../WorldcupList/Loader';
import { getComments } from '../../utils/api/comment';

interface Props {
  worldcupId: string;
  comments: CommentData[];
  offset: number;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
  setComments: React.Dispatch<React.SetStateAction<CommentData[]>>;
}

function CommentList({ worldcupId, comments, offset, setOffset, setComments }: Props): JSX.Element {
  const [loading, setLoading] = useState(false);
  const target = useRef<HTMLDivElement | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const threshold = 0.4;
  const limit = 5;

  const getCommentsAndSetComments = useCallback(async () => {
    const newComments = await getComments(worldcupId, offset, limit);
    setComments((comments) => [...comments, ...newComments]);
  }, [offset, comments.length]);

  const onIntersect = useCallback(
    async ([entry]: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      if (entry.isIntersecting && !loading) {
        setLoading((prev) => !prev);
        observer.unobserve(entry.target);
        setOffset((prev) => prev + 5);
        getCommentsAndSetComments();
        observer.observe(entry.target);
        setLoading((prev) => !prev);
      }
    },
    [offset, comments.length],
  );

  useEffect((): any => {
    if (target) {
      (observer.current as IntersectionObserver) = new IntersectionObserver(onIntersect, {
        threshold,
      });
      (observer.current as IntersectionObserver).observe(target.current as HTMLDivElement);
    }
    return () => observer.current && (observer.current as IntersectionObserver).disconnect();
  }, [onIntersect]);

  return (
    <Wrapper>
      <Text>댓글 (개수)</Text>
      <CommentContainer>
        {comments.map((comment) => (
          <Comment comment={comment} />
        ))}
      </CommentContainer>
      <div ref={target} style={{ width: '100px', height: '100px', alignSelf: 'center' }}>
        {loading && <Loader />}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
`;

const Text = styled.div`
  ${({ theme }) => theme.fontStyle.bodyBold};
`;

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.color.white};
`;

export default CommentList;