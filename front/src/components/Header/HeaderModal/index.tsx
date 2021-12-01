import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { logout } from '../../../apis/auth';
import { UserDispatcherContext } from '../../../stores/userStore';
import { useApiRequest } from '../../../hooks';
import { MAIN, MYINFO, MYWORLDCUP, MAKE } from '../../../constants/route';

interface Props {
  open: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}
function HeaderModal({ open, setModal }: Props): JSX.Element {
  const userDispatcher = useContext(UserDispatcherContext);
  const history = useHistory();
  const onLogoutSuccess = () => {
    setModal(false);
    userDispatcher({ type: 'LOGOUT' });
    history.push(MAIN);
  };
  const logoutDispatcher = useApiRequest(logout, onLogoutSuccess);
  const onLogoutBtnClick: React.MouseEventHandler = () => logoutDispatcher({ type: 'REQUEST' });
  return (
    <>
      {open ? (
        <MenuBox>
          <li>
            <Link to={MYINFO}>내 정보</Link>
          </li>
          <li>
            <Link to={MYWORLDCUP}>내가 만든 월드컵</Link>
          </li>
          <li>
            <Link to={MAKE}>월드컵 만들기</Link>
          </li>
          <li>
            <button type="button" onClick={onLogoutBtnClick}>
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
const MenuBox = styled.div`
  position: absolute;
  right: 18px;
  top: 75px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: stretch;
  text-align: center;
  width: 160px;
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
     padding: 0 2.3em;
    }
    a{
      display:block;
      width: 100%:
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

export default HeaderModal;
