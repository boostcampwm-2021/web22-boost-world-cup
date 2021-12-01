const validateImgType = (type: string): boolean => {
  const extension = type.split('/')[1];
  return ['png', 'jpg', 'jpeg', 'webp'].includes(extension);
};

export default validateImgType;
