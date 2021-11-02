import React from 'react';
import styled from 'styled-components';

interface Props {
  open: boolean;
}
function Modal({ open }: Props): JSX.Element {
  return (
    <>
      {open ? (
        <MenuBox>
          <li>내 정보</li>
          <li>내가 만든 월드컵</li>
          <li>월드컵 만들기</li>
          <li>로그아웃</li>
        </MenuBox>
      ) : (
        ''
      )}
    </>
  );
}
const MenuBox = styled.ul`
  position: absolute;
  right: 40px;
  top: 120px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: stretch;
  text-align: center;
  width: 180px;
  height: 220px;
  border: 1px solid ${({ theme }) => theme.color.gray[0]};
  border-radius: 12px;
  background-color: ${({ theme }) => theme.color.white};
  color: ${({ theme }) => theme.color.gray[0]};
  li {
    box-shadow: 0px 26px 2px -26px ${({ theme }) => theme.color.gray[0]};
    height: 100%;
    line-height: 40px;
    padding: 6px;
    cursor: pointer;
    &:hover {
      background-color: ${({ theme }) => theme.color.primary};
      color: ${({ theme }) => theme.color.black};
    }
  }
  li:last-child {
    border-bottom: 0;
  }
  li:last-child:hover {
    border-bottom-right-radius: 12px;
    border-bottom-left-radius: 12px;
  }
  li:first-child:hover {
    border-top-right-radius: 12px;
    border-top-left-radius: 12px;
  }
`;

export default Modal;
