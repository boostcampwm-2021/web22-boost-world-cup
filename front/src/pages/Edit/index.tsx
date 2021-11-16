import React, { useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import { Header, MakeWorldcupForm, ImgTable, MakePageTabBar } from '../../components';
import { useTabBar, useWorldcupForm, useImgInfos, usePagination } from '../../hooks';

function Edit(): JSX.Element {
  const PAGINATION_LIMIT = 8;
  const [worldcupFormState, worldcupFormDispatcher] = useWorldcupForm();
  const [currentTab, onTabChange] = useTabBar();
  const [imgInfos, imgInfosDispatcher] = useImgInfos();
  const [currentPage, offset, lastPage, onPageChange] = usePagination(imgInfos.length, PAGINATION_LIMIT);
  const [previews, setPreviews] = useState([]);
  const worldcupId = useMemo(() => location.pathname.split('/')[2], [location]);

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
            imgInfos={imgInfos.slice(offset, offset + PAGINATION_LIMIT)}
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
