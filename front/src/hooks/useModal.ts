import React, { useState } from 'react';

const useModal = (): [boolean, React.MouseEventHandler, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [modalOn, setModalOn] = useState(false);
  const onToggleModal: React.MouseEventHandler = (event) => {
    if (modalOn && event.target === event.currentTarget) {
      setModalOn(!modalOn);
      return;
    }
    setModalOn(true);
  };
  return [modalOn, onToggleModal, setModalOn];
};

export default useModal;
