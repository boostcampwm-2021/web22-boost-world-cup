import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Header, MakeWorldcupForm, ImgTable, MakePageTabBar } from '../../components';
import { UploadImgDispatcher, WorldcupState, WorldcupDispatcher } from './store';

function View(): JSX.Element {
  const [currentTab, setCurrentTab] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [previewStartIdx, setPreviewStartIdx] = useState(0);
  const uploadImgDispatcher = useContext(UploadImgDispatcher);
  const worldcupFormDispatcher = useContext(WorldcupDispatcher);
  const worldcupFormState = useContext(WorldcupState);
  const { imgInfos } = worldcupFormState;

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
        {currentTab === 2 && <ImgTable currentPage={currentPage} setCurrentPage={setCurrentPage} />}
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
