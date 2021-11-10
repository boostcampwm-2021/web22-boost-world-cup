import React from 'react';
import styled from 'styled-components';
import TextInput from '../TextInput';
import ImgInput from '../ImgInput';
import ImgPreViewList from '../ImgPreViewList';
import StoreBtns from '../StoreBtns';
import { ImgInfo } from '../../types/Datas';

interface Props {
  onTitleChange: React.ChangeEventHandler<HTMLInputElement>;
  onDescChange: React.ChangeEventHandler<HTMLInputElement>;
  onAddImgs: React.ChangeEventHandler<HTMLInputElement>;
  onDeleteImg: (key: string) => void;
  onStore: React.MouseEventHandler<HTMLButtonElement>;
  imgInfos: ImgInfo[];
}

function MakeWorldcupForm({
  onTitleChange,
  onDescChange,
  onAddImgs,
  onDeleteImg,
  onStore,
  imgInfos,
}: Props): JSX.Element {
  return (
    <Container onSubmit={(e) => e.preventDefault()}>
      <Title>이상형 월드컵 기본정보</Title>
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
          onChange={onDescChange}
          width="1236px"
          placeholder="월드컵을 잘 나타내는 키워드를 입력하세요. ex) #배우"
        />
      </HorizontalWrapper>
      <VerticalWrapper>
        <Label>이상형 월드컵 이미지 업로드</Label>
        {imgInfos.length ? (
          <ImgPreViewList onChange={onAddImgs} imgInfos={imgInfos} onDeleteImg={onDeleteImg} />
        ) : (
          <ImgInput onChange={onAddImgs} type="addImgs" />
        )}
      </VerticalWrapper>
      <StoreBtns onStore={onStore} />
    </Container>
  );
}

const Container = styled.form`
  width: 1844px;
  height: 811px;
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
  margin-right: 292px;
  label {
    margin-right: 23px;
    line-height: 60px;
  }
`;

const VerticalWrapper = styled.div`
  margin-right: 292px;
  label {
    margin-bottom: 30px;
  }
`;

const Label = styled.label`
  ${({ theme }) => theme.fontStyle.h3};
`;

export default MakeWorldcupForm;
