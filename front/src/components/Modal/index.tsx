import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled, { keyframes } from 'styled-components';
import { loginState } from '../../recoil/atom';
import { logout } from '../../utils/api/auth';

interface Props {
  open: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}
function Modal({ open, setModal }: Props): JSX.Element {
  const setIsLoggedIn = useSetRecoilState(loginState);
  const history = useHistory();
  const setLogout = async () => {
    setModal(false);
    const response = await logout();
    if (response.result) {
      setIsLoggedIn(false);
      history.push('/main');
    }
  };
  return (
    <>
      {open ? (
        <MenuBox>
          <li>내 정보</li>
          <li>내가 만든 월드컵</li>
          <li>
            <Link to="/make">월드컵 만들기</Link>
          </li>
          <li>
            <button type="button" onClick={setLogout}>
              로그아웃
            </button>
          </li>
        </MenuBox>
      ) : (
        ''
      )}
    </>
  );
}

const openModal = keyframes`
  0% {
    transform: rotateY(90deg);
    opacity: 0;
  }
  80% {
    transform: rotateY(-10deg);
    opacity: 0.7;
  }
  100% {
    transform: rotateY(0);
    opacity: 1;
  }
`;
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
  z-index: 1;
  border: 1px solid ${({ theme }) => theme.color.gray[0]};
  border-radius: 12px;
  background-color: ${({ theme }) => theme.color.white};
  color: ${({ theme }) => theme.color.gray[0]};
  animation: ${openModal} 400ms ease-in-out forwards;
  transform-origin: top center;
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
    button {
      all: unset;
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
