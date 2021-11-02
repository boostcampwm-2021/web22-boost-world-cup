import React from 'react';
import styled from 'styled-components';

const tagList: Array<string> = [
  '전체',
  '아이돌',
  '음식',
  '영화',
  '인기있는',
  '연예인',
  'BJ',
  '게임',
  '노래',
  '맛없는',
  '유행하는',
  '핫한',
];
function TagList() {
  return (
    <TagContainer>
      {tagList.map((tag) => (
        <Tag>{tag}</Tag>
      ))}
    </TagContainer>
  );
}

const TagContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Tag = styled.section`
  background-color: ${({ theme }) => theme.color.primary};
  padding: 10px 20px;
  margin: 10px;
  white-space: noWrap;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.color.pink};
    color: ${({ theme }) => theme.color.highlight};
  }
`;

export default TagList;
