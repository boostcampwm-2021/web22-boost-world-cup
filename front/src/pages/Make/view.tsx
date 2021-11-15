import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Header, MakeWorldcupForm, ImgTable, MakePageTabBar } from '../../components';
import { UploadImgDispatcher, WorldcupDispatcher } from './store';
import { ImgInfosState } from '../../store/ImgsStore';

function View(): JSX.Element {
  const [currentTab, setCurrentTab] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [previewStartIdx, setPreviewStartIdx] = useState(0);

  const uploadImgDispatcher = useContext(UploadImgDispatcher);
  const worldcupFormDispatcher = useContext(WorldcupDispatcher);
  const imgInfos = useContext(ImgInfosState);

  const ELEMENT_CNT_PER_PAGE = 8;
  const LAST_PAGE = Math.ceil(imgInfos.length / ELEMENT_CNT_PER_PAGE);
  const startIdx = ELEMENT_CNT_PER_PAGE * (currentPage - 1);
  const showImgInfos = imgInfos.slice(startIdx, startIdx + 8);

  const onTabChange = (pressedTab: number) => {
    if (pressedTab === currentTab) return;
    setCurrentTab(pressedTab);
    uploadImgDispatcher({ type: 'RESET' });
    setPreviewStartIdx(imgInfos.length);
  };

  const onTitleChange: React.ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    worldcupFormDispatcher({ type: 'CHANGE_TITLE', payload: target.value });
  };
  const onDescChange: React.ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    worldcupFormDispatcher({ type: 'CHANGE_DESC', payload: target.value });
  };
  const onKeywordsChange: React.ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    worldcupFormDispatcher({ type: 'ADD_KEYWORD', payload: target.value });
  };
  const onPageChange = (nextPage: number) => setCurrentPage(nextPage);

  return (
    <>
      <Header type="header" />
      <Content>
        <MakePageTabBar currentTab={currentTab} onTabChange={onTabChange} />
        {currentTab === 1 && (
          <MakeWorldcupForm
            previewStartIdx={previewStartIdx}
            onTitleChange={onTitleChange}
            onDescChange={onDescChange}
            onKeywordsChange={onKeywordsChange}
          />
        )}
        {currentTab === 2 && (
          <ImgTable
            imgInfos={showImgInfos}
            currentPage={currentPage}
            lastPage={LAST_PAGE}
            startIdx={startIdx}
            setCurrentPage={setCurrentPage}
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

export default View;
