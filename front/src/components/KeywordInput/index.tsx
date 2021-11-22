import React, { useState } from 'react';
import styled from 'styled-components';

function KeywordInput(): JSX.Element {
  const [text, setText] = useState<string>('');
  const [keywords, setKeywords] = useState<string[]>([]);

  const tempOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setText(value);
  };

  const keydownEventHander = (event: React.KeyboardEvent<HTMLElement>) => {
    const { code } = event;
    if (code === 'Space' || code === 'Enter') {
      const tempText = text.trim();
      if (tempText.length === 0) {
        setText('');
        return;
      }
      setKeywords((prev) => [...prev, tempText]);
      setText('');
      event.preventDefault();
    } else if (code === 'Backspace') {
      if (text === '') {
        setText(keywords[keywords.length - 1]);
        setKeywords((prev) => prev.slice(0, -1));
      }
    }
  };

  return (
    <KeywordContainer>
      {keywords.map((keyword) => (
        <Keyword>#{keyword}</Keyword>
      ))}
      <Input value={text} onChange={tempOnChange} onKeyUp={keydownEventHander} />
    </KeywordContainer>
  );
}

const KeywordContainer = styled.div`
  margin-top: 30px;
  margin-left: 30px;
  display: flex;
  flex-direction: row;
  width: 700px;
  border: 1px solid;
  flex-wrap: wrap;
  ${({ theme }) => theme.fontStyle.body};
`;

const Keyword = styled.div`
  margin-right: 10px;
  background-color: #e1e1e1;
  padding-right: 10px;
  padding-left: 10px;
  ${({ theme }) => theme.fontStyle.body};
`;

const Input = styled.input`
  padding-left: 3px;
  border: 1px solid;
  background-color: #e1e1e1;
`;

export default KeywordInput;
