import React, { useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import { Header, MakeWorldcupForm, ImgTable, TabBar } from '../../components';
import useApiRequest, { REQUEST } from '../../hooks/useApiRequest';
import { useTabBar, useWorldcupForm, useImgInfos, usePagination } from '../../hooks';
import {
  getWorldcupMetadata,
  getWorldcupCandidates,
  patchWorldcupTitle,
  patchWorldcupDesc,
} from '../../utils/api/worldcups';
import { createCandidates } from '../../utils/api/candidate';
import { ImgInfo, WorldcupMetaData, Candidate } from '../../types/Datas';

function Edit(): JSX.Element {
  const PAGINATION_LIMIT = 8;
  const [addedImgs, addedImgsDispatcher] = useImgInfos();
  const [candidates, candidatesDispatcher] = useImgInfos();
  const [totalCnt, setTotalCnt] = useState(0);
  const [worldcupFormState, worldcupFormDispatcher] = useWorldcupForm();
  const [currentTab, onTabChange] = useTabBar();
  const [currentPage, offset, lastPage, onPageChange] = usePagination(totalCnt, PAGINATION_LIMIT);

  const onGetMetadataSuccess = (metadata: WorldcupMetaData) => {
    const { totalCnt, title, description } = metadata;
    worldcupFormDispatcher({ type: 'CHANGE_TITLE', payload: title });
    worldcupFormDispatcher({ type: 'CHANGE_DESC', payload: description });
    setTotalCnt(totalCnt);
  };
  const getMetadataDispatcher = useApiRequest<WorldcupMetaData>(getWorldcupMetadata, onGetMetadataSuccess);

  const onGetCandidatesSuccess = (candidates: Candidate[]) => {
    const keyReg = /https:\/\/kr.object.ncloudstorage.com\/image-w120h120\/(?<key>[\w-]+.[\w]+).webp/;
    const newCandidates: ImgInfo[] = candidates.map(
      (info: any): ImgInfo => ({
        name: info.name,
        id: info.id,
        key: info.url.match(keyReg).groups.key,
        isUploaded: true,
      }),
    );
    candidatesDispatcher({ type: 'SET_IMGS', payload: newCandidates });
  };
  const getCandidatesDispatcher = useApiRequest<Candidate[]>(getWorldcupCandidates, onGetCandidatesSuccess);

  const onCreateCandidatesSuccess = () =>
    getCandidatesDispatcher({ type: REQUEST, requestProps: [worldcupId, offset, PAGINATION_LIMIT] });
  const createCandidatesDispatcher = useApiRequest(createCandidates, onCreateCandidatesSuccess);

  const patchTitleDispatcher = useApiRequest(patchWorldcupTitle);
  const patchDescDispatcher = useApiRequest(patchWorldcupDesc);

  const worldcupId = useMemo(() => Number(window.location.pathname.split('/')[2]), [window.location]);
  const tabTitle = ['1. 기본정보 수정 / 이미지 업로드', '2. 이미지 이름 수정 / 삭제'];

  const getSignedURLsSuccessEffect = (addedImgs: ImgInfo[]) => {
    createCandidatesDispatcher({ type: REQUEST, requestProps: [worldcupId, addedImgs] });
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
  }, [currentTab, worldcupId, candidates.length]);

  useEffect(() => {
    candidatesDispatcher({ type: 'RESET' });
    getCandidatesDispatcher({ type: REQUEST, requestProps: [worldcupId, offset, PAGINATION_LIMIT] });
  }, [currentPage, worldcupId]);

  useEffect(() => {
    addedImgsDispatcher({ type: 'RESET' });
  }, [currentTab]);

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
