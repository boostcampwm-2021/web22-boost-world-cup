const validateImgType = (type: string) => {
  const extension = type.split('/')[1];
  console.log(extension);
  return ['png', 'jpg', 'jpeg', 'webp'].includes(extension);
};

export default validateImgType;
