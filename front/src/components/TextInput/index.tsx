import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

interface Props {
  name: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  width: string;
  placeholder?: string;
  defaultValue?: string | number;
  value?: string | number;
  invalid?: boolean;
  disabled?: boolean;
}

function TextInput({ name, onChange, width, ...props }: Props): JSX.Element {
  const inputRef = useRef<null | HTMLInputElement>(null);
  useEffect(() => {
    const input = inputRef.current;
    if (!props.defaultValue || !input) return;
    input.value = String(props.defaultValue);
  }, []);
  return <Input ref={inputRef} style={{ width }} name={name} onChange={onChange} {...props} autoComplete="off" />;
}

const Input = styled.input`
  padding: 10px 20px;
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
