import React, { useState } from 'react';
import axios from 'axios';
import { Header, MakeWorldcupForm } from '../../components';

function Make(): JSX.Element {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [imgInfos, setImgInfos] = useState<any>([]);

  const onTitleChange: React.ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    setTitle(target.value);
  };
  const onDescChange: React.ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    setDesc(target.value);
  };
  const onFilesChange: React.ChangeEventHandler<HTMLInputElement> = async ({ target }) => {
    const { files } = target;
    if (!files) {
      return;
    }
    const newFiles = [...files].filter((file: File) => !imgInfos.map((info: any) => info.name).includes(file.name));
    interface PreSignedData {
      key: string;
      preSignedData: any;
    }
    const contentTypes = newFiles.map((file) => file.type);
    const { data } = await axios.post('http://localhost:8000/api/images/presigned-url', { contentTypes });
    const newImgInfos = data.map(({ key, preSignedData }: PreSignedData, idx: number) => {
      const { fields, url } = preSignedData;
      const file = newFiles[idx];
      return { preSignedURL: url, name: file.name, file, key, fields };
    });
    setImgInfos([...imgInfos, ...newImgInfos]);
  };
  const onImgDelete = (imgKey: string) => {
    const targetIdx = imgInfos.findIndex((info: any) => info.key === imgKey);
    setImgInfos([...imgInfos.slice(0, targetIdx), ...imgInfos.slice(targetIdx + 1)]);
  };
  const onStore: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Header isLogin canSearch={false} />
      <MakeWorldcupForm
        onTitleChange={onTitleChange}
        onDescChange={onDescChange}
        onFilesChange={onFilesChange}
        onImgDelete={onImgDelete}
        onStore={onStore}
        imgInfos={imgInfos}
      />
    </>
  );
}

export default Make;
