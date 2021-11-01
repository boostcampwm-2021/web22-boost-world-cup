import React from 'react';
import { FaSearch } from 'react-icons/fa';
import styled from 'styled-components';
import TextInput from '../TextInput';

interface Props {
  onSubmit: React.MouseEventHandler<HTMLButtonElement>;
  onSearchWordChange: React.ChangeEventHandler<HTMLInputElement>;
}

function SearchBar({ onSubmit, onSearchWordChange }: Props): JSX.Element {
  return (
    <Container>
      <TextInput name="searchWord" onChange={onSearchWordChange} width="486px" />
      <SubmitButton onClick={onSubmit}>
        <FaSearch size={30} />
      </SubmitButton>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  width: 486px;
`;

const SubmitButton = styled.button`
  position: absolute;
  height: 30px;
  right: 20px;
  top: 15px;
`;

export default SearchBar;
