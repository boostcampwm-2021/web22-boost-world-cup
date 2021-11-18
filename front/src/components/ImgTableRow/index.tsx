import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ImgInfo } from '../../types/Datas';
import ImgPreView from '../ImgPreView';
import TextInput from '../TextInput';
import ImgInput from '../ImgInput';
import { getSignedURLs } from '../../utils/api/image';
import { deleteCandidate, patchCandidate } from '../../utils/api/candidate';
import useApiRequest, { NULL, REQUEST, SUCCESS, FAILURE } from '../../hooks/useApiRequest';
import { ImgsAction } from '../../hooks/useImgInfos';

interface Props {
  imgInfo: ImgInfo;
  num: number;
  imgInfosDispatcher: React.Dispatch<ImgsAction>;
}

function ImgTableRow({ imgInfo, num, imgInfosDispatcher }: Props): JSX.Element {
  const [willUploadFile, setWillUploadFile] = useState<File | null>(null);
  const [presignedURL, setPresignedURL] = useState<string | null>(null);
  const [deleteCandidateResult, deleteCandidateDispatcher] = useApiRequest(deleteCandidate);
  const [patchCandidateResult, patchCandidateDispatcher] = useApiRequest(patchCandidate);
  const [getSignedURLsResult, getSignedURLsDispatcher] = useApiRequest(getSignedURLs);

  const onDeleteImg = () => {
    deleteCandidateDispatcher({ type: REQUEST, requestProps: [imgInfo.key] });
  };
  const onImgNameBlur: React.FocusEventHandler<HTMLInputElement> = ({ target }) => {
    if (imgInfo.name === target.value) return;
    patchCandidateDispatcher({ type: REQUEST, requestProps: [imgInfo.key, target.value] });
    imgInfosDispatcher({ type: 'CHANGE_IMG_NAME', payload: { key: imgInfo.key, name: target.value } });
  };
  const onImgChange: React.ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    if (!target.files) return;
    const [file] = [...target.files];
    const contentTypes = [file.type];
    getSignedURLsDispatcher({ type: REQUEST, requestProps: [contentTypes] });
    setWillUploadFile(file);
  };

  useEffect(() => {
    const { type } = deleteCandidateResult;
    switch (type) {
      case NULL:
      case REQUEST:
        return;
      case SUCCESS: {
        imgInfosDispatcher({ type: 'DELETE_IMG', payload: imgInfo.key });
        return;
      }
      case FAILURE: {
        return;
      }
      default:
        throw new Error('Unexpected request type');
    }
  }, [deleteCandidateResult]);

  useEffect(() => {
    const { type } = getSignedURLsResult;
    switch (type) {
      case NULL:
      case REQUEST:
        return;
      case SUCCESS: {
        if (!willUploadFile) return;
        const { data } = getSignedURLsResult;
        const { key: newKey, presignedURL } = data[0];
        const { key: preKey } = imgInfo;
        const { name } = willUploadFile;
        setPresignedURL(presignedURL);
        patchCandidateDispatcher({ type: REQUEST, requestProps: [preKey, name, newKey] });
        imgInfosDispatcher({
          type: 'CHANGE_IMG',
          payload: { newKey, name, preKey },
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
    setPresignedURL(null);
    setWillUploadFile(null);
  }, [imgInfo.key]);

  return (
    <Container>
      <RowItem style={{ width: '138px' }}>{num}</RowItem>
      <RowItem style={{ width: '144px' }}>
        <ImgPreView
          info={imgInfo}
          tab={2}
          willUploadFile={willUploadFile}
          presignedURL={presignedURL}
          imgInfosDispatcher={imgInfosDispatcher}
        />
      </RowItem>
      <RowItem style={{ width: '487px' }}>
        <TextInput
          name="imgName"
          onBlur={onImgNameBlur}
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
