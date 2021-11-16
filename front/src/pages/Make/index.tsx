import React, { useState } from 'react';
import styled from 'styled-components';
import { Header, MakeWorldcupForm, ImgTable, MakePageTabBar, StoreBtns } from '../../components';
import { usePagination, useTabBar, useImgInfos, useWorldcupForm } from '../../hooks';

function Make(): JSX.Element {
  const [worldcupFormState, worldcupFormDispatcher] = useWorldcupForm();
  const [imgInfos, imgInfosDispatcher] = useImgInfos();
  const PAGINATION_LIMIT = 8;
  const [previewStartIdx, setPreviewStartIdx] = useState(0);
  const [currentTab, onTabChange] = useTabBar(() => setPreviewStartIdx(imgInfos.length));
  const [currentPage, offset, lastPage, onPageChange] = usePagination(imgInfos.length, PAGINATION_LIMIT);

  return (
    <>
      <Header type="header" />
      <Content>
        <MakePageTabBar currentTab={currentTab} onTabChange={onTabChange} />
        {currentTab === 1 && (
          <MakeWorldcupForm
            previews={imgInfos.slice(previewStartIdx)}
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
            imgInfos={imgInfos.slice(offset, offset + PAGINATION_LIMIT)}
            currentPage={currentPage}
            lastPage={lastPage}
            offset={offset}
            onPageChange={onPageChange}
            imgInfosDispatcher={imgInfosDispatcher}
          />
        )}
        <StoreBtns imgInfos={imgInfos} worldcupFormState={worldcupFormState} />
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
