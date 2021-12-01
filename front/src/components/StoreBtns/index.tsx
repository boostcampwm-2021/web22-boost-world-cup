import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { createWorldcup } from '../../apis/worldcups';
import { MAIN } from '../../constants/route';
import { useApiRequest } from '../../hooks';
import { WorldcupState } from '../../types/States';
import { ImgInfo } from '../../types/Datas';

interface Props {
  imgInfos: ImgInfo[];
  worldcupFormState: WorldcupState;
}

function StoreBtns({ imgInfos, worldcupFormState }: Props): JSX.Element {
  const onCreateWorldcupSuccess = () => history.push(MAIN);
  const createWorldcupDispatcher = useApiRequest(createWorldcup, onCreateWorldcupSuccess);
  const history = useHistory();

  const onStore: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    const { title, desc, keywords } = worldcupFormState;

    /* eslint-disable no-alert */
    if (!title) {
      alert('제목을 입력해주세요!');
      return;
    }
    if (!desc) {
      alert('설명을 입력해주세요!');
      return;
    }
    if (imgInfos.length < 4) {
      alert('이미지를 4개 이상 업로드해주세요!');
      return;
    }
    createWorldcupDispatcher({ type: 'REQUEST', requestProps: [title, desc, keywords, imgInfos] });
  };

  return (
    <BtnsWrapper>
      <Btn type="button" onClick={onStore}>
        저장하기
      </Btn>
    </BtnsWrapper>
  );
}

const Btn = styled.button`
  width: 110px;
  height: 45px;
  border-radius: 10px;
  margin-left: 20px;
  transition: background-color 0.3s;
  background-color: ${({ theme }) => theme.color.primary};
  ${({ theme }) => theme.fontStyle.bodyBold};
  &:hover {
    background-color: ${({ theme }) => theme.color.pink};
  }
`;

const BtnsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 11px;
`;

export default StoreBtns;
