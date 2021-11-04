import React, { useReducer } from 'react';
import axios from 'axios';
import { Header, MakeWorldcupForm } from '../../components';
import { ImgInfo, FetchPreSigned } from '../../types/Datas';
import worldcupFormReducer, { initialWorldcupFormState } from './reducer';

function Make(): JSX.Element {
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
    const newImgInfos: ImgInfo[] = data.map(({ key, preSignedData }: FetchPreSigned, idx: number): ImgInfo => {
      const { fields, url } = preSignedData;
      const file = newFiles[idx];
      const fileData = new FormData();
      Object.keys(fields).forEach((key) => {
        fileData.append(key, fields[key]);
      });
      fileData.append('file', file);
      axios.post(url, fileData);
      return { name: file.name, key };
    });
    worldcupFormDispatcher({ type: 'CHANGE_IMG_INFOS', payload: [...imgInfos, ...newImgInfos] });
  };

  const onDeleteImg = (imgKey: string) => {
    const targetIdx = imgInfos.findIndex((info: ImgInfo) => info.key === imgKey);
    worldcupFormDispatcher({
      type: 'CHANGE_IMG_INFOS',
      payload: [...imgInfos.slice(0, targetIdx), ...imgInfos.slice(targetIdx + 1)],
    });
    axios.delete(`http://localhost:8000/api/images/${imgKey}`);
  };

  const onStore: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/worldcups', {
      title,
      desc,
      imgInfos: imgInfos.map((imgInfo) => ({ key: imgInfo.key, name: imgInfo.name })),
    });
  };

  return (
    <>
      <Header type="header" isLogin />
      <MakeWorldcupForm
        onTitleChange={onTitleChange}
        onDescChange={onDescChange}
        onAddImgs={onAddImgs}
        onDeleteImg={onDeleteImg}
        onStore={onStore}
        imgInfos={imgInfos}
      />
    </>
  );
}

export default Make;
