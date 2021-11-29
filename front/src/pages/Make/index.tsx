import React, { useState } from 'react';
import styled from 'styled-components';
import { Header, MakeWorldcupForm, ImgTable, TabBar, StoreBtns } from '../../components';
import { usePaginationSync, useTabBar, useImgInfos, useWorldcupForm } from '../../hooks';
import { ImgInfo } from '../../types/Datas';
import { PAGINATION_LIMIT } from '../../constants/number';

function Make(): JSX.Element {
  const [worldcupFormState, worldcupFormDispatcher] = useWorldcupForm();
  const [imgInfos, imgInfosDispatcher] = useImgInfos();
  const [previewStartIdx, setPreviewStartIdx] = useState(0);
  const [currentTab, onTabChange] = useTabBar(() => setPreviewStartIdx(imgInfos.length));
  const [pageItems, currentPage, offset, lastPage, onPageChange] = usePaginationSync<ImgInfo>(
    imgInfos.length,
    PAGINATION_LIMIT,
    imgInfos,
    [currentTab, imgInfos.length],
  );
  const tabTitle = ['1. 기본정보 수정 / 이미지 업로드', '2. 이미지 이름 수정 / 삭제'];

  const getSignedURLsSuccessEffect = (newImgInfos: ImgInfo[]) => {
    imgInfosDispatcher({ type: 'ADD_IMGS', payload: newImgInfos });
  };

  return (
    <>
      <Header />
      <Content>
        <TabBar tabTitle={tabTitle} currentTab={currentTab} onTabChange={onTabChange} />
        {currentTab === 1 && (
          <MakeWorldcupForm
            imgInfos={imgInfos.slice(previewStartIdx)}
            worldcupFormState={worldcupFormState}
            onTitleChange={({ target }) => {
              worldcupFormDispatcher({ type: 'CHANGE_TITLE', payload: target.value });
            }}
            onDescChange={({ target }) => {
              worldcupFormDispatcher({ type: 'CHANGE_DESC', payload: target.value });
            }}
            worldcupFormDispatcher={worldcupFormDispatcher}
            imgInfosDispatcher={imgInfosDispatcher}
            getSignedURLsSuccessEffect={getSignedURLsSuccessEffect}
          />
        )}
        {currentTab === 2 && (
          <ImgTable
            imgInfos={pageItems}
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
  width: 90%;
  margin: auto;
  margin-top: 20px;
`;

export default Make;
