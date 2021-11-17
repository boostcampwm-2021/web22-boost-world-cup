import React from 'react';
import styled from 'styled-components';
import useApiRequest, { REQUEST } from '../../hooks/useApiRequest';
import { useUploadState } from '../../hooks';
import { getSignedURLs } from '../../utils/api/image';
import getUUID from '../../utils/getUUID';
import { ImgInfo, PreSignedData } from '../../types/Datas';
import { ImgsAction } from '../../hooks/useImgInfos';
import { WorldcupState } from '../../hooks/useWorldcupForm';
import TextInput from '../TextInput';
import ImgInput from '../ImgInput';
import ImgPreViewList from '../ImgPreViewList';

interface Props {
  imgInfos: ImgInfo[];
  worldcupFormState: WorldcupState;
  onKeywordsChange: React.ChangeEventHandler<HTMLInputElement>;
  imgInfosDispatcher: React.Dispatch<ImgsAction>;
  getSignedURLsSuccessEffect: (newImgInfos: ImgInfo[]) => void;
  onTitleChange?: React.ChangeEventHandler<HTMLInputElement>;
  onDescChange?: React.ChangeEventHandler<HTMLInputElement>;
  onTitleBlur?: React.FocusEventHandler<HTMLInputElement>;
  onDescBlur?: React.FocusEventHandler<HTMLInputElement>;
}

function MakeWorldcupForm({
  imgInfos,
  worldcupFormState,
  onTitleChange,
  onDescChange,
  onKeywordsChange,
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
  const { title, desc } = worldcupFormState;

  const onAddImgs: React.ChangeEventHandler<HTMLInputElement> = async ({ target }) => {
    const { files } = target;
    if (!files) {
      return;
    }
    const newFiles = [...files].filter((file: File) => !imgInfos.map((info: ImgInfo) => info.name).includes(file.name));
    const contentTypes = newFiles.map((file) => file.type);
    getSignedURLsDispatcher({ type: REQUEST, requestProps: [contentTypes] });
    uploadStateDispatcher({ type: 'ADD_FILES', payload: newFiles });
  };

  return (
    <Container onSubmit={(e) => e.preventDefault()}>
      <Title>이상형 월드컵 기본정보</Title>
      <InputsWrapper>
        <HorizontalWrapper>
          <Label>제목</Label>
          <TextInput
            name="title"
            onChange={onTitleChange}
            width="1236px"
            placeholder="이상형월드컵의 제목을 입력하세요. ex) 여자 아이돌 이상형 월드컵, 남자 연예인 이상형월드컵"
            defaultValue={title}
            onBlur={onTitleBlur}
          />
        </HorizontalWrapper>
        <HorizontalWrapper>
          <Label>설명</Label>
          <TextInput
            name="desc"
            onChange={onDescChange}
            width="1236px"
            placeholder="설명, 하고싶은 말 등을 자유롭게 입력하세요."
            defaultValue={desc}
            onBlur={onDescBlur}
          />
        </HorizontalWrapper>
        <HorizontalWrapper>
          <Label>키워드</Label>
          <TextInput
            name="keyword"
            onChange={onKeywordsChange}
            width="1236px"
            placeholder="월드컵을 잘 나타내는 키워드를 입력하세요. ex) #배우"
          />
        </HorizontalWrapper>
      </InputsWrapper>
      <VerticalWrapper>
        <Label>이상형 월드컵 이미지 업로드</Label>
        {imgInfos.length ? (
          <ImgPreViewList
            imgInfos={imgInfos}
            uploadState={uploadState}
            onAddImgs={onAddImgs}
            imgInfosDispatcher={imgInfosDispatcher}
          />
        ) : (
          <ImgInput onChange={onAddImgs} type="addImgs" />
        )}
      </VerticalWrapper>
    </Container>
  );
}

const Container = styled.form`
  width: 1844px;
  height: 811px;
  padding-right: 261px;
  background-color: ${({ theme }) => theme.color.white};
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const Title = styled.div`
  width: 100%;
  padding-left: 137px;
  ${({ theme }) => theme.fontStyle.h1};
  margin-top: 26px;
  margin-bottom: 35px;
`;

const HorizontalWrapper = styled.div`
  display: flex;
  margin-bottom: 35px;
  label {
    margin-right: 23px;
    line-height: 60px;
  }
`;

const InputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const VerticalWrapper = styled.div`
  label {
    margin-bottom: 30px;
  }
`;

const Label = styled.label`
  ${({ theme }) => theme.fontStyle.h3};
`;

export default MakeWorldcupForm;
