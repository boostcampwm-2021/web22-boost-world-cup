import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { WorldcupAction } from '../../hooks/useWorldcupForm';

interface Props {
  worldcupFormDispatcher?: React.Dispatch<WorldcupAction>;
}

function KeywordInput({ worldcupFormDispatcher }: Props): JSX.Element {
  const possibleKeywordCnt = 5;
  const [text, setText] = useState<string>('');
  const [keywords, setKeywords] = useState<string[]>([]);
  const hideSpanRef = useRef<HTMLSpanElement | null>(null);

  const onChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (keywords.length === possibleKeywordCnt) {
      // eslint-disable-next-line no-alert
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

  const keydownEventHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 229) {
      return;
    }
    const { code } = event;
    if (code === 'Space' || code === 'Enter') {
      const tempText = text.trim();
      if (tempText.length === 0) {
        setText('');
        return;
      }
      if (worldcupFormDispatcher) {
        worldcupFormDispatcher({ type: 'ADD_KEYWORD', payload: tempText });
      }
      setKeywords((prev) => [...prev, tempText]);
      setText('');
      event.preventDefault();
    } else if (code === 'Backspace') {
      if (text.length === 0) {
        if (keywords.length === 0) {
          return;
        }
        setText(keywords[keywords.length - 1]);
        setKeywords((prev) => prev.slice(0, -1));
      }
    }
  };

  return (
    <KeywordContainer>
      {keywords.map((keyword, idx) => (
        <Keyword key={keyword + idx.toString()}>#{keyword}</Keyword>
      ))}
      <Input
        keywordLen={keywords.length}
        value={text}
        onChange={onChangeEventHandler}
        onKeyDown={keydownEventHandler}
        placeholder={keywords.length === 0 ? '키워드는 최대 5개입니다.' : ''}
      />
      <HideText ref={hideSpanRef} />
    </KeywordContainer>
  );
}

const KeywordContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  width: 100%;
  flex-wrap: wrap;
  height: 40px;
  border-radius: 10px;
  transition: border-color 0.3s;
  padding: 10px 50px 10px 10px;
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

const Keyword = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 10px;
  background-color: #e1e1e1;
  padding: 0px 10px 0px 10px;
  border-radius: 8px;
  ${({ theme }) => theme.fontStyle.caption};
  color: ${({ theme }) => theme.color.gray[3]};
  background-color: ${({ theme }) => theme.color.primary};
`;

const Input = styled.input<{ keywordLen: number }>`
  width: ${({ keywordLen }) => (keywordLen === 0 ? '200px' : '50px')};
  padding-left: 5px;
  border: none;
  border-radius: 8px;
  ${({ theme }) => theme.fontStyle.caption};
  color: ${({ theme }) => theme.color.gray[3]};
  background-color: ${({ theme }) => theme.color.primary};
`;

const HideText = styled.span`
  position: absolute;
  padding-left: 5px;
  top: -9999px;
  ${({ theme }) => theme.fontStyle.caption};
`;

export default KeywordInput;
