const provider = () => {
  let id = 0;
  return () => {
    id += 1;
    return id;
  };
};

export default provider();
