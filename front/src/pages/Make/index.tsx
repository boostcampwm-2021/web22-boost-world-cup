import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Header, MakeWorldcupForm, ImgTable, MakePageTabBar } from '../../components';
import { ImgInfosState } from '../../store/ImgsStore';
import { UploadImgDispatcher } from '../../store/UploadImgStore';
import { WorldcupFormDispatcher } from '../../store/WorldcupFormStore';
import { usePagination, useTabBar } from '../../hooks';

function Make(): JSX.Element {
  const uploadImgDispatcher = useContext(UploadImgDispatcher);
  const worldcupFormDispatcher = useContext(WorldcupFormDispatcher);
  const imgInfos = useContext(ImgInfosState);
  const PAGINATION_LIMIT = 8;
  const tabChangeEffect = () => {
    uploadImgDispatcher({ type: 'RESET' });
    setPreviewStartIdx(imgInfos.length);
  };
  const [previewStartIdx, setPreviewStartIdx] = useState(0);
  const [currentTab, onTabChange] = useTabBar(tabChangeEffect);
  const [currentPage, offset, lastPage, onPageChange] = usePagination(imgInfos.length, PAGINATION_LIMIT);

  return (
    <>
      <Header type="header" />
      <Content>
        <MakePageTabBar currentTab={currentTab} onTabChange={onTabChange} />
        {currentTab === 1 && (
          <MakeWorldcupForm
            previewStartIdx={previewStartIdx}
            onTitleChange={({ target }) => {
              worldcupFormDispatcher({ type: 'CHANGE_TITLE', payload: target.value });
            }}
            onDescChange={({ target }) => {
              worldcupFormDispatcher({ type: 'CHANGE_DESC', payload: target.value });
            }}
            onKeywordsChange={({ target }) => {
              worldcupFormDispatcher({ type: 'ADD_KEYWORD', payload: target.value });
            }}
          />
        )}
        {currentTab === 2 && (
          <ImgTable
            imgInfos={imgInfos.slice(offset, offset + PAGINATION_LIMIT)}
            currentPage={currentPage}
            lastPage={lastPage}
            offset={offset}
            onPageChange={onPageChange}
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

export default Make;
