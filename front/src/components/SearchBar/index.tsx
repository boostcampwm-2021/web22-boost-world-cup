import React from 'react';
import { FaSearch } from 'react-icons/fa';
import styled from 'styled-components';
import TextInput from '../TextInput';

interface Props {
  onSubmit?: React.MouseEventHandler<HTMLButtonElement>;
  onSearchWordChange: React.ChangeEventHandler<HTMLInputElement>;
  searchWord: string;
}

function SearchBar({ onSubmit, onSearchWordChange, searchWord }: Props): JSX.Element {
  return (
    <Container>
      <TextInput
        name="searchWord"
        value={searchWord}
        onChange={onSearchWordChange}
        width="230px"
        placeholder="검색어를 입력하세요."
      />
      <SubmitButton onClick={onSubmit}>
        <FaSearch size={20} />
      </SubmitButton>
    </Container>
  );
}

const Container = styled.form`
  position: relative;
  margin: 30px;
`;

const SubmitButton = styled.button`
  position: absolute;
  right: 15px;
  top: 10px;
`;

export default SearchBar;
