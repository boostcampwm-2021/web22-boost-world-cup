import React, { useCallback, useContext } from 'react';
import styled from 'styled-components';
import { CommentData } from '../../types/Datas';
import { deleteComment } from '../../utils/api/comment';
import { UserStateContext } from '../../stores/userStore';

interface Props {
  comment: CommentData;
  setComments: React.Dispatch<React.SetStateAction<CommentData[]>>;
}

function Comment({ comment, setComments }: Props): JSX.Element {
  const { isLoggedIn, id: userId } = useContext(UserStateContext);

  const getDateString = useCallback((date: string) => {
    const yymmdd = date.split('T')[0];
    const hhmmss = date.split('T')[1].split('.')[0];
    return `${yymmdd} ${hhmmss}`;
  }, []);

  const deleteButtonClickHandler = async (event: React.MouseEvent<HTMLElement>) => {
    const {
      dataset: { value: commendId },
    } = event.target as HTMLElement;
    if (commendId) {
      const { result } = await deleteComment(commendId);
      if (result === 'success') {
        setComments((prev) => prev.filter((comment) => comment.commentId !== Number(commendId)));
      }
    }
  };

  return (
    <Wrapper>
      <SubContainer>
        <Writer>{comment.nickname}</Writer>
        <Date>{getDateString(comment.createdAt)}</Date>
        {userId === comment.userId ? (
          <DeleteButton onClick={deleteButtonClickHandler} data-value={comment.commentId}>
            삭제
          </DeleteButton>
        ) : (
          ''
        )}
      </SubContainer>
      <Message>{comment.message}</Message>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 5px;
`;

const Writer = styled.div`
  ${({ theme }) => theme.fontStyle.bodyBold};
  margin-right: 15px;
`;
const Date = styled.div`
  ${({ theme }) => theme.fontStyle.button};
  margin-right: 10px;
`;
const Message = styled.div`
  ${({ theme }) => theme.fontStyle.body};
  width: 100%;
  word-break: break-word;
  margin: 3px 0 0 5px;
`;

const DeleteButton = styled.div`
  border-radius: 5px;
  cursor: pointer;
  color: red;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  ${({ theme }) => theme.fontStyle.button};
`;

const SubContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
`;

export default Comment;
