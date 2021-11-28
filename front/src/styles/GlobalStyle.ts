import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  button {
    background-color: rgba(0, 0, 0, 0);
    cursor: pointer;
  }

  * {
    box-sizing: border-box;
    font-family: Noto Sans KR;
  }

  label {
    display: block;
  }
`;
