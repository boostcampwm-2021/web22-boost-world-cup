import React, { useRef, useEffect, memo } from 'react';
import styled from 'styled-components';

interface Props {
  name: string;
  width: string;
  placeholder?: string;
  defaultValue?: string | number;
  value?: string | number;
  invalid?: boolean;
  disabled?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

function TextInput({ name, width, defaultValue, ...props }: Props): JSX.Element {
  const inputRef = useRef<null | HTMLInputElement>(null);
  useEffect(() => {
    const input = inputRef.current;
    if (!defaultValue || !input) return;
    input.value = String(defaultValue);
  }, [defaultValue]);
  return <Input ref={inputRef} style={{ width }} name={name} {...props} autoComplete="off" />;
}

const Input = styled.input`
  height: 40px;
  border-radius: 10px;
  transition: border-color 0.3s;
  padding: 10px 10px 10px 10px;
  font: ${({ theme }) => theme.fontStyle.body};
  font-size: 15px;
  color: ${({ theme }) => theme.color.black};
  background-color: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.black};
  &::placeholder {
    color: ${({ theme }) => theme.color.gray[1]};
  }
  &:focus {
    border-color: ${({ theme }) => theme.color.pink};
  }
`;

export default memo(TextInput);
