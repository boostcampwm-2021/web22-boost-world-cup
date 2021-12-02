import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../../components/Header';
import MakeWorldcupForm from '../../components/MakeWorldcupForm';
import TabBar from '../../components/TabBar';
import ImgTable from '../../components/ImgTable';
import { useTabBar, useWorldcupForm, useImgInfos, usePaginationAsync, useApiRequest } from '../../hooks';
import {
  getWorldcupAuth,
  getWorldcupMetadata,
  getWorldcupCandidates,
  patchWorldcupTitle,
  patchWorldcupDesc,
} from '../../apis/worldcups';
import { createCandidates } from '../../apis/candidate';
import { ImgInfo, WorldcupMetaData, CandidateData } from '../../types/Datas';
import { PAGINATION_LIMIT } from '../../constants/number';
import { MAIN } from '../../constants/route';

function Edit(): JSX.Element {
  const worldcupId = useMemo(() => Number(window.location.pathname.split('/')[2]), [window.location]);
  const tabTitles = useMemo(() => ['1. 기본정보 수정 / 이미지 업로드', '2. 이미지 이름 수정 / 삭제'], []);
  const history = useHistory();
  const [addedImgs, addedImgsDispatcher] = useImgInfos();
  const [candidates, candidatesDispatcher] = useImgInfos();
  const [totalCnt, setTotalCnt] = useState(0);
  const [worldcupFormState, worldcupFormDispatcher] = useWorldcupForm();
  const [currentTab, onTabChange] = useTabBar();
  const [pageItems, currentPage, offset, lastPage, onPageChange] = usePaginationAsync<CandidateData>(
    totalCnt,
    PAGINATION_LIMIT,
    getWorldcupCandidates,
    [worldcupId],
    [currentTab, candidates.length],
  );

  const onGetMetadataSuccess = (metadata: WorldcupMetaData) => {
    const { totalCnt, title, description, keywords } = metadata;
    worldcupFormDispatcher({ type: 'CHANGE_TITLE', payload: title });
    worldcupFormDispatcher({ type: 'CHANGE_DESC', payload: description });
    worldcupFormDispatcher({ type: 'ADD_KEYWORDS', payload: keywords });
    setTotalCnt(totalCnt);
  };

  const getWorldcupAuthFailed = () => {
    history.push(MAIN);
  };

  const getMetadataDispatcher = useApiRequest<WorldcupMetaData>(getWorldcupMetadata, onGetMetadataSuccess);

  const createCandidatesDispatcher = useApiRequest(createCandidates);

  const getWorldcupAuthDispatcher = useApiRequest(getWorldcupAuth, undefined, getWorldcupAuthFailed);
  const patchTitleDispatcher = useApiRequest(patchWorldcupTitle);
  const patchDescDispatcher = useApiRequest(patchWorldcupDesc);

  const getSignedURLsSuccessEffect = (addedImgs: ImgInfo[]) => {
    createCandidatesDispatcher({ type: 'REQUEST', requestProps: [worldcupId, addedImgs] });
    addedImgsDispatcher({ type: 'ADD_IMGS', payload: addedImgs });
  };
  const onTitleBlur: React.FocusEventHandler<HTMLInputElement> = useCallback(
    ({ target }) => {
      const { title } = worldcupFormState;
      if (title === target.value) return;
      patchTitleDispatcher({ type: 'REQUEST', requestProps: [worldcupId, target.value] });
      worldcupFormDispatcher({ type: 'CHANGE_TITLE', payload: target.value });
    },
    [worldcupFormState.title],
  );
  const onDescBlur: React.FocusEventHandler<HTMLInputElement> = useCallback(
    ({ target }) => {
      const { desc } = worldcupFormState;
      if (desc === target.value) return;
      patchDescDispatcher({ type: 'REQUEST', requestProps: [worldcupId, target.value] });
      worldcupFormDispatcher({ type: 'CHANGE_DESC', payload: target.value });
    },
    [worldcupFormState.desc],
  );

  useEffect(() => {
    getMetadataDispatcher({ type: 'REQUEST', requestProps: [worldcupId] });
  }, [currentTab, worldcupId, candidates.length]);

  useEffect(() => {
    const newCandidates = pageItems.map(({ id, name, imgKey: key }: CandidateData) => ({
      id,
      name,
      key,
      isUploaded: true,
    }));
    candidatesDispatcher({ type: 'SET_IMGS', payload: newCandidates });
  }, [pageItems]);

  useEffect(() => {
    addedImgsDispatcher({ type: 'RESET' });
  }, [currentTab]);

  useEffect(() => {
    getWorldcupAuthDispatcher({ type: 'REQUEST', requestProps: [worldcupId] });
  }, []);

  return (
    <>
      <Header />
      <Content>
        <TabBar currentTab={currentTab} onTabChange={onTabChange} tabTitles={tabTitles} />
        {currentTab === 1 && (
          <MakeWorldcupForm
            imgInfos={addedImgs}
            worldcupFormState={worldcupFormState}
            onTitleBlur={onTitleBlur}
            onDescBlur={onDescBlur}
            worldcupFormDispatcher={worldcupFormDispatcher}
            imgInfosDispatcher={addedImgsDispatcher}
            getSignedURLsSuccessEffect={getSignedURLsSuccessEffect}
          />
        )}
        {currentTab === 2 && (
          <ImgTable
            imgInfos={candidates}
            currentPage={currentPage}
            lastPage={lastPage}
            offset={offset}
            onPageChange={onPageChange}
            imgInfosDispatcher={candidatesDispatcher}
          />
        )}
        <Link to={MAIN}>
          <BtnWrapper>
            <CompleteBtn>완료하기</CompleteBtn>
          </BtnWrapper>
        </Link>
      </Content>
    </>
  );
}

const Content = styled.main`
  width: 90%;
  margin: auto;
  margin-top: 20px;
`;

const BtnWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const CompleteBtn = styled.button`
  width: 110px;
  height: 45px;
  margin-top: 11px;
  display: flex;
  text-align: center;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  ransition: background-color 0.3s;
  background-color: ${({ theme }) => theme.color.primary};
  ${({ theme }) => theme.fontStyle.bodyBold};
  &:hover {
    background-color: ${({ theme }) => theme.color.pink};
  }
`;

export default Edit;
