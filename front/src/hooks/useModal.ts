import React, { useState } from 'react';

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return { isOpen, toggle };
};

export default useModal;
