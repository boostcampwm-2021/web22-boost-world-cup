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
import { PreSignedData } from '../../types/Datas';

interface Props {
  imgInfo: ImgInfo;
  num: number;
  imgInfosDispatcher: React.Dispatch<ImgsAction>;
}

function ImgTableRow({ imgInfo, num, imgInfosDispatcher }: Props): JSX.Element {
  const [willUploadFile, setWillUploadFile] = useState<File | null>(null);
  const [presignedURL, setPresignedURL] = useState<string | null>(null);

  const onDeleteCandidateSuccess = () => imgInfosDispatcher({ type: 'DELETE_IMG', payload: imgInfo.key });
  const deleteCandidateDispatcher = useApiRequest(deleteCandidate, onDeleteCandidateSuccess);

  const onGetSignedURLsSuccess = (presignedDatas: PreSignedData[]) => {
    if (!willUploadFile) return;
    const { key: newKey, presignedURL } = presignedDatas[0];
    const { key: preKey } = imgInfo;
    const { name } = willUploadFile;
    setPresignedURL(presignedURL);
    patchCandidateDispatcher({ type: REQUEST, requestProps: [preKey, name, newKey] });
    imgInfosDispatcher({
      type: 'CHANGE_IMG',
      payload: { newKey, name, preKey },
    });
  };
  const getSignedURLsDispatcher = useApiRequest<PreSignedData[]>(getSignedURLs, onGetSignedURLsSuccess);

  const patchCandidateDispatcher = useApiRequest(patchCandidate);

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
