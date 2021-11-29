import React, { useState } from 'react';

const useModal = (): [boolean, React.MouseEventHandler] => {
  const [modalOn, setModalOn] = useState(false);
  const onToggleModal: React.MouseEventHandler = (event) => {
    if (modalOn && event.target === event.currentTarget) {
      setModalOn(!modalOn);
      return;
    }
    setModalOn(true);
  };
  return [modalOn, onToggleModal];
};

export default useModal;
