import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { WorldcupDispatcher } from '../../pages/Make/store';
import { ImgInfo } from '../../types/Datas';
import ImgPreView from '../ImgPreView';
import TextInput from '../TextInput';
import ImgInput from '../ImgInput';
import { deleteImage, getSignedURLs, uploadImage } from '../../utils/api/image';
import useApiRequest, { NULL, REQUEST, SUCCESS, FAILURE } from '../../hooks/useApiRequest';

interface Props {
  imgInfo: ImgInfo;
  num: number;
}

function ImgTableRow({ imgInfo, num }: Props): JSX.Element {
  const worldcupDispatcher = useContext(WorldcupDispatcher);
  const [deleteImageResult, deleteImageDispatcher] = useApiRequest(deleteImage);
  const [getSignedURLsResult, getSignedURLsDispatcher] = useApiRequest(getSignedURLs);
  const [uploadImageResult, uploadImageDispatcher] = useApiRequest(uploadImage);
  const [willUploadFile, setWillUploadFile] = useState<File | null>(null);

  const onDeleteImg = () => {
    deleteImageDispatcher({ type: REQUEST, requestProps: [imgInfo.key] });
  };
  const onImgNameChange: React.ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    worldcupDispatcher({ type: 'CHANGE_IMG_NAME', payload: { key: imgInfo.key, name: target.value } });
  };
  const onImgChange: React.ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    if (!target.files) return;
    const [file] = [...target.files];
    const contentTypes = [file.type];
    getSignedURLsDispatcher({ type: REQUEST, requestProps: [contentTypes] });
    setWillUploadFile(file);
  };

  useEffect(() => {
    const { type } = deleteImageResult;
    switch (type) {
      case NULL:
      case REQUEST:
        return;
      case SUCCESS: {
        worldcupDispatcher({ type: 'DELETE_IMG', payload: imgInfo.key });
        return;
      }
      case FAILURE: {
        return;
      }
      default:
        throw new Error('Unexpected request type');
    }
  }, [deleteImageResult]);

  useEffect(() => {
    const { type } = getSignedURLsResult;
    switch (type) {
      case NULL:
      case REQUEST:
        return;
      case SUCCESS: {
        if (!willUploadFile) return;
        const { data } = getSignedURLsResult;
        const { key, presignedURL } = data[0];
        const fileReader = new FileReader();
        fileReader.addEventListener('load', async ({ target }) => {
          if (!target || !target.result || typeof target.result === 'string') return;
          uploadImageDispatcher({ type: REQUEST, requestProps: [presignedURL, target.result, willUploadFile.type] });
        });
        fileReader.readAsArrayBuffer(willUploadFile);
        worldcupDispatcher({
          type: 'CHANGE_IMG',
          payload: { newKey: key, name: willUploadFile.name, preKey: imgInfo.key },
        });
        return;
      }
      case FAILURE: {
        return;
      }
      default:
        throw new Error('Unexpected request type');
    }
  }, [getSignedURLsResult]);

  useEffect(() => {
    const { type } = uploadImageResult;
    switch (type) {
      case NULL:
      case REQUEST:
        return;
      case SUCCESS: {
        worldcupDispatcher({ type: 'FINISH_IMG_UPLOAD', payload: imgInfo.key });
        return;
      }
      case FAILURE: {
        return;
      }
      default:
        throw new Error('Unexpected request type');
    }
  }, [uploadImageResult]);

  return (
    <Container>
      <RowItem style={{ width: '138px' }}>{num}</RowItem>
      <RowItem style={{ width: '144px' }}>
        <ImgPreView info={imgInfo} tab={2} />
      </RowItem>
      <RowItem style={{ width: '487px' }}>
        <TextInput
          name="imgName"
          onChange={onImgNameChange}
          width="400px"
          placeholder="이미지의 이름을 입력해주세요."
          defaultValue={imgInfo.name}
        />
      </RowItem>
      <RowItem style={{ width: '625px' }}>
        <ImgInput onChange={onImgChange} type="changeImg" />
      </RowItem>
      <RowItem style={{ width: '450px' }}>
        <DeleteBtn type="button" onClick={onDeleteImg}>
          라인 삭제
        </DeleteBtn>
      </RowItem>
    </Container>
  );
}

const Container = styled.div`
  background-color: ${({ theme }) => theme.color.white};
  height: 150px;
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.color.black};
  transition: background-color 0.3s;
  &:hover {
    background-color: #f5f5f5;
  }
`;

const RowItem = styled.div`
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ theme }) => theme.fontStyle.h2};
`;

const DeleteBtn = styled.button`
  width: 134px;
  height: 60px;
  border-radius: 10px;
  border: 1px solid #ff0000;
  color: #ff0000;
  ${({ theme }) => theme.fontStyle.h3};
  transition: background-color 0.3s, color 0.3s;
  &:hover {
    background-color: #ff0000;
    color: ${({ theme }) => theme.color.white};
  }
`;

export default ImgTableRow;
