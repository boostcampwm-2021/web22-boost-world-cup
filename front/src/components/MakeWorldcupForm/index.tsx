import React from 'react';
import styled from 'styled-components';
import { useUploadState, useApiRequest } from '../../hooks';
import { getSignedURLs } from '../../apis/image';
import getUUID from '../../utils/getUUID';
import validateImgType from '../../utils/validateImgType';
import { ImgInfo, PreSignedData } from '../../types/Datas';
import { ImgsAction, WorldcupAction } from '../../types/Actions';
import { WorldcupState } from '../../types/States';
import TextInput from '../TextInput';
import AddImgs from '../ImgInputs/AddImgs';
import ImgPreViewList from '../ImgPreViewList';
import KeywordInput from '../KeywordInput';

interface Props {
  imgInfos: ImgInfo[];
  worldcupFormState: WorldcupState;
  imgInfosDispatcher: React.Dispatch<ImgsAction>;
  getSignedURLsSuccessEffect: (newImgInfos: ImgInfo[]) => void;
  onTitleChange?: React.ChangeEventHandler<HTMLInputElement>;
  worldcupFormDispatcher?: React.Dispatch<WorldcupAction>;
  onDescChange?: React.ChangeEventHandler<HTMLInputElement>;
  onTitleBlur?: React.FocusEventHandler<HTMLInputElement>;
  onDescBlur?: React.FocusEventHandler<HTMLInputElement>;
}

function MakeWorldcupForm({
  imgInfos,
  worldcupFormState,
  onTitleChange,
  onDescChange,
  worldcupFormDispatcher,
  imgInfosDispatcher,
  getSignedURLsSuccessEffect,
  onTitleBlur,
  onDescBlur,
}: Props): JSX.Element {
  const onGetSignedURLsSuccess = (presignedDatas: PreSignedData[]) => {
    const newImgInfos = presignedDatas.map((presignedData: PreSignedData, idx: number) => {
      const { key } = presignedData;
      const file = willUploadFiles[idx];
      return { name: file.name, isUploaded: false, id: getUUID(), key };
    });
    uploadStateDispatcher({
      type: 'ADD_PRESIGNED_URL',
      payload: presignedDatas.map((data: PreSignedData) => data.presignedURL),
    });
    if (getSignedURLsSuccessEffect) getSignedURLsSuccessEffect(newImgInfos);
  };
  const getSignedURLsDispatcher = useApiRequest<PreSignedData[]>(getSignedURLs, onGetSignedURLsSuccess);

  const [uploadState, uploadStateDispatcher] = useUploadState();
  const { willUploadFiles } = uploadState;
  const { title, desc, keywords } = worldcupFormState;

  const onAddImgs: React.ChangeEventHandler<HTMLInputElement> = async ({ target }) => {
    const { files } = target;
    if (!files) {
      return;
    }
    const newFiles = [...files]
      .filter(
        (file: File) => !imgInfos.map((info: ImgInfo) => info.name).includes(file.name) && validateImgType(file.type),
      )
      .map((file) => new File([file], file.name.trim().replace(/(.png|.jpg|.jpeg|.webp)$/, ''), { type: file.type }));
    const contentTypes = newFiles.map((file) => file.type);
    getSignedURLsDispatcher({ type: 'REQUEST', requestProps: [contentTypes] });
    uploadStateDispatcher({ type: 'ADD_FILES', payload: newFiles });
  };

  return (
    <Container onSubmit={(e) => e.preventDefault()}>
      <Title>????????? ????????? ????????????</Title>
      <InputsWrapper>
        <HorizontalWrapper>
          <Label>??????</Label>
          <TextInput
            name="title"
            onChange={onTitleChange}
            width="100%"
            placeholder="????????????????????? ????????? ???????????????. ex) ?????? ????????? ????????? ?????????, ?????? ????????? ??????????????????"
            defaultValue={title}
            onBlur={onTitleBlur}
          />
        </HorizontalWrapper>
        <HorizontalWrapper>
          <Label>??????</Label>
          <TextInput
            name="desc"
            onChange={onDescChange}
            width="100%"
            placeholder="??????, ???????????? ??? ?????? ???????????? ???????????????."
            defaultValue={desc}
            onBlur={onDescBlur}
          />
        </HorizontalWrapper>
        <HorizontalWrapper>
          <Label>?????????</Label>
          <KeywordInput worldcupFormDispatcher={worldcupFormDispatcher} defaultValue={keywords} />
        </HorizontalWrapper>
      </InputsWrapper>
      <VerticalWrapper>
        <Label>????????? ????????? ????????? ?????????</Label>
        {imgInfos.length ? (
          <ImgPreViewList
            imgInfos={imgInfos}
            uploadState={uploadState}
            onAddImgs={onAddImgs}
            imgInfosDispatcher={imgInfosDispatcher}
          />
        ) : (
          <AddImgs onChange={onAddImgs} />
        )}
      </VerticalWrapper>
    </Container>
  );
}

const Container = styled.form`
  display: flex;
  flex-direction: column;
  padding: 30px 40px 20px 40px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25);
  background-color: ${({ theme }) => theme.color.white};
`;

const Title = styled.div`
  margin-bottom: 20px;
  ${({ theme }) => theme.fontStyle.h3};
`;

const InputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const HorizontalWrapper = styled.div`
  display: flex;
  margin-bottom: 35px;
  label {
    width: 60px;
    height: 30px;
    margin-right: 23px;
    ${({ theme }) => theme.fontStyle.bodyBold};
    line-height: 40px;
  }
`;

const Label = styled.label`
  flex: none;
  font-size: 20px;
  font-weight: bold;
`;

const VerticalWrapper = styled.div`
  width: 100%;
  label {
    margin-bottom: 30px;
  }
`;

export default MakeWorldcupForm;
