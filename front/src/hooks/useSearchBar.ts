import React, { useState } from 'react';

export const useSearchBar = (
  setOffset: React.Dispatch<React.SetStateAction<number>> | null,
): [string, string, React.MouseEventHandler, React.ChangeEventHandler<HTMLInputElement>] => {
  const [searchWord, setSearchWord] = useState('');
  const [inputWord, setInputWord] = useState('');

  const onSubmit: React.MouseEventHandler = (event) => {
    event.preventDefault();
    setSearchWord(inputWord);
    setInputWord('');
    if (setOffset) setOffset(0);
  };

  const onSearchWordChange: React.ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    setInputWord(target.value);
  };

  return [searchWord, inputWord, onSubmit, onSearchWordChange];
};
