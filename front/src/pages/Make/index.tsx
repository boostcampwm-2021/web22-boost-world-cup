import React, { useReducer, useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Header, MakeWorldcupForm, ImgTable, MakePageTabBar } from '../../components';
import { ImgInfo, PreSignedData } from '../../types/Datas';
import worldcupFormReducer, { initialWorldcupFormState } from './reducer';

function Make(): JSX.Element {
  const [currentTab, setCurrentTab] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [preViews, setPreViews] = useState<ImgInfo[]>([]);
  const [worldcupFormState, worldcupFormDispatcher] = useReducer(worldcupFormReducer, initialWorldcupFormState);
  const { title, desc, imgInfos } = worldcupFormState;

  const onTitleChange: React.ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    worldcupFormDispatcher({ type: 'CHANGE_TITLE', payload: target.value });
  };
  const onDescChange: React.ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    worldcupFormDispatcher({ type: 'CHANGE_DESC', payload: target.value });
  };

  const onAddImgs: React.ChangeEventHandler<HTMLInputElement> = async ({ target }) => {
    const { files } = target;
    if (!files) {
      return;
    }
    const newFiles = [...files].filter((file: File) => !imgInfos.map((info: ImgInfo) => info.name).includes(file.name));
    const contentTypes = newFiles.map((file) => file.type);
    const { data } = await axios.post('http://localhost:8000/api/images/presigned-url', { contentTypes });
    const newImgInfos: ImgInfo[] = data.map((presignedData: PreSignedData, idx: number) => {
      const { presignedURL, key } = presignedData;
      const file = newFiles[idx];
      const fileReader = new FileReader();
      fileReader.addEventListener('load', ({ target }) => {
        if (!target || !target.result || typeof target.result === 'string') return;
        axios.put(presignedURL, target.result, { headers: { 'Content-Type': file.type } });
      });
      fileReader.readAsArrayBuffer(file);
      return { name: file.name, key };
    });
    worldcupFormDispatcher({ type: 'CHANGE_IMG_INFOS', payload: [...imgInfos, ...newImgInfos] });
    setPreViews((prevPreViews) => [...prevPreViews, ...newImgInfos]);
  };

  const onDeleteImg = (imgKey: string) => {
    const targetIdx = imgInfos.findIndex((info: ImgInfo) => info.key === imgKey);
    worldcupFormDispatcher({
      type: 'CHANGE_IMG_INFOS',
      payload: [...imgInfos.slice(0, targetIdx), ...imgInfos.slice(targetIdx + 1)],
    });
    axios.delete(`http://localhost:8000/api/images/${imgKey}`);
  };

  const getOnImgChange = (preImgKey: string) => {
    return async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return;
      const [file] = [...e.target.files];
      const contentTypes = [file.type];
      const { data } = await axios.post('http://localhost:8000/api/images/presigned-url', { contentTypes });
      const { key, preSignedData } = data[0];
      const { fields, url } = preSignedData;
      const fileData = new FormData();
      Object.keys(fields).forEach((key) => {
        fileData.append(key, fields[key]);
      });
      fileData.append('file', file);
      axios.post(url, fileData);
      const targetIdx = imgInfos.findIndex((info: ImgInfo) => info.key === preImgKey);
      worldcupFormDispatcher({
        type: 'CHANGE_IMG_INFOS',
        payload: [...imgInfos.slice(0, targetIdx), { key, name: file.name }, ...imgInfos.slice(targetIdx + 1)],
      });
    };
  };

  const getOnTabChange = (tabNum: number) => {
    return () => {
      if (currentTab === tabNum) return;
      setCurrentTab(tabNum);
    };
  };

  const onStore: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/worldcups', {
      title,
      desc,
      imgInfos: imgInfos.map((imgInfo) => ({ key: imgInfo.key, name: imgInfo.name })),
    });
  };

  const getOnImgNameChange = (imgKey: string) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const targetIdx = imgInfos.findIndex((info) => info.key === imgKey);
      worldcupFormDispatcher({
        type: 'CHANGE_IMG_INFOS',
        payload: [
          ...imgInfos.slice(0, targetIdx),
          { ...imgInfos[targetIdx], name: e.target.value },
          ...imgInfos.slice(targetIdx + 1),
        ],
      });
    };
  };

  useEffect(() => {
    setPreViews([]);
  }, [currentTab]);

  return (
    <>
      <Header type="header" isLogin />
      <Content>
        <MakePageTabBar currentTab={currentTab} getOnTabChange={getOnTabChange} />
        {currentTab === 1 && (
          <MakeWorldcupForm
            onTitleChange={onTitleChange}
            onDescChange={onDescChange}
            onAddImgs={onAddImgs}
            onDeleteImg={onDeleteImg}
            onStore={onStore}
            imgInfos={preViews}
          />
        )}
        {currentTab === 2 && (
          <ImgTable
            imgInfos={imgInfos}
            onDeleteImg={onDeleteImg}
            getOnImgNameChange={getOnImgNameChange}
            getOnImgChange={getOnImgChange}
            onStore={onStore}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
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
