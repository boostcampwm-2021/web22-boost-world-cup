import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { WorldcupState } from '../../pages/Make/store';
import { ImgInfosState } from '../../store/ImgsStore';
import { createWorldcup } from '../../utils/api/worldcups';
import { MAIN } from '../../commons/constants/route';
import useApiRequest, { NULL, REQUEST, SUCCESS, FAILURE } from '../../hooks/useApiRequest';

function StoreBtns(): JSX.Element {
  const worldcupFormState = useContext(WorldcupState);
  const imgInfos = useContext(ImgInfosState);
  const [createWorldcupResult, createWorldcupDispatcher] = useApiRequest(createWorldcup);
  const history = useHistory();

  const onStore: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    const { title, desc, keywords } = worldcupFormState;
    createWorldcupDispatcher({ type: REQUEST, requestProps: [title, desc, keywords, imgInfos] });
  };

  useEffect(() => {
    const { type } = createWorldcupResult;
    switch (type) {
      case NULL:
      case REQUEST:
        return;
      case SUCCESS: {
        history.push(MAIN);
        return;
      }
      case FAILURE: {
        return;
      }
      default: {
        throw new Error('Unexpected request type');
      }
    }
  }, [createWorldcupResult]);

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
  margin-top: 11px;
`;

export default StoreBtns;
