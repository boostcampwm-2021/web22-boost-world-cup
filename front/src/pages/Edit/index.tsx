import React, { useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import { Header, MakeWorldcupForm, ImgTable, MakePageTabBar } from '../../components';
import useApiRequest, { NULL, REQUEST, SUCCESS, FAILURE } from '../../hooks/useApiRequest';
import { useTabBar, useWorldcupForm, useImgInfos, usePagination } from '../../hooks';
import { getWorldcupMetadata, getWorldcupCandidates } from '../../utils/api/worldcups';

function Edit(): JSX.Element {
  const PAGINATION_LIMIT = 8;
  const [previews, setPreviews] = useState([]);
  const [totalCnt, setTotalCnt] = useState(0);
  const [worldcupFormState, worldcupFormDispatcher] = useWorldcupForm();
  const [currentTab, onTabChange] = useTabBar();
  const [imgInfos, imgInfosDispatcher] = useImgInfos();
  const [currentPage, offset, lastPage, onPageChange] = usePagination(totalCnt, PAGINATION_LIMIT);
  const [getMetadataResult, getMetadataDispatcher] = useApiRequest(getWorldcupMetadata);
  const [getCandidatesResult, getCandidatesDispatcher] = useApiRequest(getWorldcupCandidates);
  const worldcupId = useMemo(() => location.pathname.split('/')[2], [location]);

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
      case SUCCESS:
        const { data: metadata } = getMetadataResult;
        const { totalCnt, title, description } = metadata;
        worldcupFormDispatcher({ type: 'CHANGE_TITLE', payload: title });
        worldcupFormDispatcher({ type: 'CHANGE_DESC', payload: description });
        setTotalCnt(totalCnt);
        return;
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
      case SUCCESS:
        const { data: candidates } = getCandidatesResult;
        imgInfosDispatcher({ type: 'SET_IMGS', payload: candidates });
        return;
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
        <MakePageTabBar currentTab={currentTab} onTabChange={onTabChange} />
        {currentTab === 1 && (
          <MakeWorldcupForm
            previews={previews}
            worldcupFormState={worldcupFormState}
            onTitleChange={({ target }) => {
              worldcupFormDispatcher({ type: 'CHANGE_TITLE', payload: target.value });
            }}
            onDescChange={({ target }) => {
              worldcupFormDispatcher({ type: 'CHANGE_DESC', payload: target.value });
            }}
            onKeywordsChange={({ target }) => {
              worldcupFormDispatcher({ type: 'ADD_KEYWORD', payload: target.value });
            }}
            imgInfosDispatcher={imgInfosDispatcher}
          />
        )}
        {currentTab === 2 && (
          <ImgTable
            imgInfos={imgInfos}
            currentPage={currentPage}
            lastPage={lastPage}
            offset={offset}
            onPageChange={onPageChange}
            imgInfosDispatcher={imgInfosDispatcher}
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
