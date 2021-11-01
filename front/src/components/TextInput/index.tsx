import React from 'react';
import styled from 'styled-components';

interface Props {
  name: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  width: string;
  placeholder?: string;
  value?: string | number;
  invalid?: boolean;
  disabled?: boolean;
}

function TextInput({ name, onChange, width, ...props }: Props): JSX.Element {
  return <Input style={{ width }} name={name} onChange={onChange} {...props} autoComplete="off" />;
}

const Input = styled.input`
  padding-left: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 15px;
  height: 60px;
  color: ${({ theme }) => theme.color.black};
  background-color: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.black};
  ${({ theme }) => theme.fontStyle.h3};
  &::placeholder {
    color: ${({ theme }) => theme.color.gray[1]};
  }
`;

export default TextInput;
