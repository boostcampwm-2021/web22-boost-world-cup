import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Header, MakeWorldcupForm, ImgTable, TabBar } from '../../components';
import useApiRequest, { REQUEST } from '../../hooks/useApiRequest';
import { useTabBar, useWorldcupForm, useImgInfos, usePaginationAsync } from '../../hooks';
import {
  getWorldcupMetadata,
  getWorldcupCandidates,
  patchWorldcupTitle,
  patchWorldcupDesc,
} from '../../apis/worldcups';
import { createCandidates } from '../../apis/candidate';
import { ImgInfo, WorldcupMetaData, candidateData } from '../../types/Datas';
import { PAGINATION_LIMIT } from '../../constants/number';
import { MAIN } from '../../constants/route';

function Edit(): JSX.Element {
  const worldcupId = useMemo(() => Number(window.location.pathname.split('/')[2]), [window.location]);
  const tabTitle = ['1. 기본정보 수정 / 이미지 업로드', '2. 이미지 이름 수정 / 삭제'];
  const [addedImgs, addedImgsDispatcher] = useImgInfos();
  const [candidates, candidatesDispatcher] = useImgInfos();
  const [totalCnt, setTotalCnt] = useState(0);
  const [worldcupFormState, worldcupFormDispatcher] = useWorldcupForm();
  const [currentTab, onTabChange] = useTabBar();
  const [pageItems, currentPage, offset, lastPage, onPageChange] = usePaginationAsync<candidateData>(
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
  const getMetadataDispatcher = useApiRequest<WorldcupMetaData>(getWorldcupMetadata, onGetMetadataSuccess);

  const createCandidatesDispatcher = useApiRequest(createCandidates);

  const patchTitleDispatcher = useApiRequest(patchWorldcupTitle);
  const patchDescDispatcher = useApiRequest(patchWorldcupDesc);

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
    const newCandidates = pageItems.map(({ id, name, imgKey: key }: candidateData) => ({
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
