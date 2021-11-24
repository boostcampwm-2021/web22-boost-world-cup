import React, { useRef, useState } from 'react';
import styled from 'styled-components';

function KeywordInput(): JSX.Element {
  const possibleKeywordCnt = 5;
  const [text, setText] = useState<string>('');
  const [keywords, setKeywords] = useState<string[]>([]);
  const hideSpanRef = useRef<HTMLSpanElement | null>(null);

  const onChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (keywords.length === possibleKeywordCnt) {
      alert('키워드 초과');
      return;
    }
    const {
      target: { value },
    } = event;
    setText(value);
    if (hideSpanRef.current) {
      hideSpanRef.current.innerText = value;
      event.target.style.width = `${hideSpanRef.current.clientWidth + 10}px`;
    }
  };
  const keypressEventHandler = (event: React.KeyboardEvent<HTMLElement>) => {
    const { code } = event;
    if (code !== 'Space' && code !== 'Enter') {
      return;
    }
    const tempText = text.trim();
    if (tempText.length === 0) {
      setText('');
      return;
    }
    setKeywords((prev) => [...prev, tempText]);
    setText('');
    event.preventDefault();
  };
  const keydownEventHandler = (event: React.KeyboardEvent<HTMLElement>) => {
    const { code } = event;
    if (code !== 'Backspace') {
      return;
    }
    if (text.length === 0) {
      if (keywords.length === 0) {
        return;
      }
      setText(keywords[keywords.length - 1]);
      setKeywords((prev) => prev.slice(0, -1));
    }
  };

  return (
    <KeywordContainer>
      {keywords.map((keyword, idx) => (
        <Keyword key={keyword + idx.toString()}>#{keyword}</Keyword>
      ))}
      <Input
        value={text}
        onChange={onChangeEventHandler}
        onKeyPress={keypressEventHandler}
        onKeyDown={keydownEventHandler}
      />
      <HideText ref={hideSpanRef} />
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
  width: 30px;
  padding-left: 5px;
  padding-right: 5px;
  border: 1px solid;
  background-color: #e1e1e1;
  ${({ theme }) => theme.fontStyle.body};
`;

const HideText = styled.span`
  position: absolute;
  padding-left: 3px;
  padding-right: 3px;
  top: -9999px;
  ${({ theme }) => theme.fontStyle.body};
`;

export default KeywordInput;
