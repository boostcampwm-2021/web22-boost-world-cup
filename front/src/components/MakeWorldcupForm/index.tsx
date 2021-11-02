import React, { useState } from 'react';
import styled from 'styled-components';
import TextInput from '../TextInput';
import ImgInput from '../ImgInput';

function MakeWorldcupForm(): JSX.Element {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [files, setFiles] = useState<File[]>([]);

  const onTitleChange: React.ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    setTitle(target.value);
  };
  const onDescChange: React.ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    setDesc(target.value);
  };
  const onFilesChange: React.ChangeEventHandler<HTMLInputElement> = async ({ target }) => {
    if (!target.files) {
      setFiles([]);
      return;
    }
    setFiles([...target.files]);
  };
  const onStore: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    console.log(title, desc, files);
  };

  return (
    <Container onSubmit={(e) => e.preventDefault()}>
      <div>
        <Label>제목</Label>
        <TextInput
          name="title"
          onChange={onTitleChange}
          width="1236px"
          placeholder="이상형월드컵의 제목을 입력하세요. ex) 여자 아이돌 이상형 월드컵, 남자 연예인 이상형월드컵"
        />
      </div>
      <div>
        <Label>설명</Label>
        <TextInput
          name="desc"
          onChange={onDescChange}
          width="1236px"
          placeholder="설명, 하고싶은 말 등을 자유롭게 적어주세요."
        />
      </div>
      <div>
        <Label>이상형 월드컵 이미지 업로드</Label>
        <ImgInput onChange={onFilesChange} />
      </div>
      <button type="button" onClick={onStore}>
        저장하기
      </button>
    </Container>
  );
}

const Container = styled.form`
  width: 1844px;
  height: 811px;
  background-color: ${({ theme }) => theme.color.white};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const Label = styled.label`
  ${({ theme }) => theme.fontStyle.h3};
`;

export default MakeWorldcupForm;
