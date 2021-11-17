import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { createWorldcup } from '../../utils/api/worldcups';
import { MAIN } from '../../commons/constants/route';
import useApiRequest, { REQUEST } from '../../hooks/useApiRequest';
import { WorldcupState } from '../../hooks/useWorldcupForm';
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
    createWorldcupDispatcher({ type: REQUEST, requestProps: [title, desc, keywords, imgInfos] });
  };

  return (
    <BtnsWrapper>
      <Btn type="button">임시저장</Btn>
      <Btn type="button" onClick={onStore}>
        저장하기
      </Btn>
    </BtnsWrapper>
  );
}

const Btn = styled.button`
  background-color: ${({ theme }) => theme.color.primary};
  ${({ theme }) => theme.fontStyle.h3};
  width: 124px;
  height: 57px;
  border-radius: 10px;
  margin-left: 30px;
  transition: background-color 0.3s;
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
