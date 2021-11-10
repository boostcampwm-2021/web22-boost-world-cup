import React from 'react';
import styled from 'styled-components';
import { ImgInfo } from '../../types/Datas';
import ImgPreView from '../ImgPreView';
import TextInput from '../TextInput';
import ImgInput from '../ImgInput';

interface Props {
  imgInfo: ImgInfo;
  num: number;
  onDelete: (key: string) => void;
  getOnImgNameChange: (imgKey: string) => React.ChangeEventHandler<HTMLInputElement>;
  getOnImgChange: (imgKey: string) => React.ChangeEventHandler<HTMLInputElement>;
}

function ImgTableRow({ imgInfo, num, onDelete, getOnImgNameChange, getOnImgChange }: Props): JSX.Element {
  return (
    <Container>
      <RowItem style={{ width: '138px' }}>{num}</RowItem>
      <RowItem style={{ width: '144px' }}>
        <ImgPreView onDelete={onDelete} info={imgInfo} width={120} height={120} deleteBtnExist={false} />
      </RowItem>
      <RowItem style={{ width: '487px' }}>
        <TextInput
          name="imgName"
          onChange={getOnImgNameChange(imgInfo.key)}
          width="400px"
          placeholder="이미지의 이름을 입력해주세요."
          defaultValue={imgInfo.name}
        />
      </RowItem>
      <RowItem style={{ width: '625px' }}>
        <ImgInput onChange={getOnImgChange(imgInfo.key)} type="changeImg" />
      </RowItem>
      <RowItem style={{ width: '450px' }}>
        <DeleteBtn type="button" onClick={() => onDelete(imgInfo.key)}>
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
