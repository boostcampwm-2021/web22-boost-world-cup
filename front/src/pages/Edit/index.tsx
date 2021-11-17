import React, { useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import { Header, MakeWorldcupForm, ImgTable, TabBar } from '../../components';
import useApiRequest, { NULL, REQUEST, SUCCESS, FAILURE } from '../../hooks/useApiRequest';
import { useTabBar, useWorldcupForm, useImgInfos, usePagination } from '../../hooks';
import {
  getWorldcupMetadata,
  getWorldcupCandidates,
  patchWorldcupTitle,
  patchWorldcupDesc,
} from '../../utils/api/worldcups';
import { ImgInfo } from '../../types/Datas';

function Edit(): JSX.Element {
  const PAGINATION_LIMIT = 8;
  const [addedImgs, addedImgsDispatcher] = useImgInfos();
  const [candidates, candidatesDispatcher] = useImgInfos();
  const [totalCnt, setTotalCnt] = useState(0);
  const [worldcupFormState, worldcupFormDispatcher] = useWorldcupForm();
  const [currentTab, onTabChange] = useTabBar();
  const [currentPage, offset, lastPage, onPageChange] = usePagination(totalCnt, PAGINATION_LIMIT);
  const [getMetadataResult, getMetadataDispatcher] = useApiRequest(getWorldcupMetadata);
  const [getCandidatesResult, getCandidatesDispatcher] = useApiRequest(getWorldcupCandidates);
  const [patchTitleResult, patchTitleDispatcher] = useApiRequest(patchWorldcupTitle);
  const [patchDescResult, patchDescDispatcher] = useApiRequest(patchWorldcupDesc);
  const tabTitle = ['1. 기본정보 수정 / 이미지 업로드', '2. 이미지 이름 수정 / 삭제'];
  const worldcupId = useMemo(() => window.location.pathname.split('/')[2], [window.location]);

  const getSignedURLsSuccessEffect = (addedImgs: ImgInfo[]) => {
    addedImgsDispatcher({ type: 'ADD_IMGS', payload: addedImgs });
  };
  const onTitleBlur: React.FocusEventHandler<HTMLInputElement> = ({ target }) => {
    const { title } = worldcupFormState;
    if (title === target.value) return;
    patchTitleDispatcher({ type: REQUEST, requestProps: [worldcupId, target.value] });
    worldcupFormDispatcher({ type: 'CHANGE_TITLE', payload: target.value });
  };
  const onDescBlur: React.FocusEventHandler<HTMLInputElement> = ({ target }) => {
    const { desc } = worldcupFormState;
    if (desc === target.value) return;
    patchDescDispatcher({ type: REQUEST, requestProps: [worldcupId, target.value] });
    worldcupFormDispatcher({ type: 'CHANGE_DESC', payload: target.value });
  };

  useEffect(() => {
    getMetadataDispatcher({ type: REQUEST, requestProps: [worldcupId] });
  }, [currentTab, worldcupId]);

  useEffect(() => {
    getCandidatesDispatcher({ type: REQUEST, requestProps: [worldcupId, offset, PAGINATION_LIMIT] });
  }, [currentPage, worldcupId]);

  useEffect(() => {
    const { type } = getMetadataResult;
    switch (type) {
      case NULL:
      case REQUEST:
        return;
      case SUCCESS: {
        const { data: metadata } = getMetadataResult;
        const { totalCnt, title, description } = metadata;
        worldcupFormDispatcher({ type: 'CHANGE_TITLE', payload: title });
        worldcupFormDispatcher({ type: 'CHANGE_DESC', payload: description });
        setTotalCnt(totalCnt);
        return;
      }
      case FAILURE:
        return;
      default:
        throw new Error('Unexpected request type');
    }
  }, [getMetadataResult]);

  useEffect(() => {
    const { type } = getCandidatesResult;
    switch (type) {
      case NULL:
      case REQUEST:
        return;
      case SUCCESS: {
        const { data: candidates } = getCandidatesResult;
        candidatesDispatcher({ type: 'SET_IMGS', payload: candidates });
        return;
      }
      case FAILURE:
        return;
      default:
        throw new Error('Unexpected request type');
    }
  }, [getCandidatesResult]);

  return (
    <>
      <Header type="header" />
      <Content>
        <TabBar currentTab={currentTab} onTabChange={onTabChange} tabTitle={tabTitle} />
        {currentTab === 1 && (
          <MakeWorldcupForm
            imgInfos={addedImgs}
            worldcupFormState={worldcupFormState}
            onTitleBlur={onTitleBlur}
            onDescBlur={onDescBlur}
            onKeywordsChange={({ target }) => {
              worldcupFormDispatcher({ type: 'ADD_KEYWORD', payload: target.value });
            }}
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
      </Content>
    </>
  );
}

const Content = styled.main`
  width: 1844px;
  margin: 0 auto;
  margin-top: 22px;
`;

export default Edit;
