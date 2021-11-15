import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { WorldcupState, WorldcupDispatcher, UploadImgState, UploadImgDispatcher } from '../../pages/Make/store';
import useApiRequest, { NULL, REQUEST, SUCCESS, FAILURE } from '../../hooks/useApiRequest';
import { getSignedURLs } from '../../utils/api/image';
import { ImgInfo, PreSignedData } from '../../types/Datas';
import TextInput from '../TextInput';
import ImgInput from '../ImgInput';
import ImgPreViewList from '../ImgPreViewList';
import StoreBtns from '../StoreBtns';

interface Props {
  previewStartIdx: number;
}

function MakeWorldcupForm({ previewStartIdx }: Props): JSX.Element {
  const [getSignedURLsResult, getSignedURLsDispatcher] = useApiRequest(getSignedURLs);
  const uploadDispatcher = useContext(UploadImgDispatcher);
  const { willUploadFiles } = useContext(UploadImgState);
  const worldcupFormDispatcher = useContext(WorldcupDispatcher);
  const { imgInfos } = useContext(WorldcupState);
  const previews = imgInfos.slice(previewStartIdx);

  const onTitleChange: React.ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    worldcupFormDispatcher({ type: 'CHANGE_TITLE', payload: target.value });
  };
  const onDescChange: React.ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    worldcupFormDispatcher({ type: 'CHANGE_DESC', payload: target.value });
  };
  const onKeywordsChange: React.ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    worldcupFormDispatcher({ type: 'ADD_KEYWORD', payload: target.value });
  };

  const onAddImgs: React.ChangeEventHandler<HTMLInputElement> = async ({ target }) => {
    const { files } = target;
    if (!files) {
      return;
    }
    const newFiles = [...files].filter((file: File) => !imgInfos.map((info: ImgInfo) => info.name).includes(file.name));
    const contentTypes = newFiles.map((file) => file.type);
    getSignedURLsDispatcher({ type: REQUEST, requestProps: [contentTypes] });
    uploadDispatcher({ type: 'ADD_FILES', payload: newFiles });
  };

  useEffect(() => {
    const { type } = getSignedURLsResult;
    switch (type) {
      case NULL:
      case REQUEST:
        return;
      case SUCCESS: {
        const { data: presignedDatas } = getSignedURLsResult;
        if (!presignedDatas) return;
        const newImgInfos = presignedDatas.map((presignedData: PreSignedData, idx: number) => {
          const { key } = presignedData;
          const file = willUploadFiles[idx];
          return { name: file.name, isUploaded: false, key };
        });
        uploadDispatcher({
          type: 'ADD_PRESIGNED_URL',
          payload: presignedDatas.map((data: PreSignedData) => data.presignedURL),
        });
        worldcupFormDispatcher({ type: 'ADD_IMGS', payload: newImgInfos });
        return;
      }
      case FAILURE: {
        return;
      }
      default: {
        throw new Error('Unexpected request type');
      }
    }
  }, [getSignedURLsResult]);

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
          />
        </HorizontalWrapper>
        <HorizontalWrapper>
          <Label>설명</Label>
          <TextInput
            name="desc"
            onChange={onDescChange}
            width="1236px"
            placeholder="설명, 하고싶은 말 등을 자유롭게 입력하세요."
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
        {previews.length ? (
          <ImgPreViewList imgInfos={previews} onAddImgs={onAddImgs} />
        ) : (
          <ImgInput onChange={onAddImgs} type="addImgs" />
        )}
      </VerticalWrapper>
      <StoreBtns />
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
