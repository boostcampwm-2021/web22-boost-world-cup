import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import '@fontsource/rancho';
import { FaUserAlt } from 'react-icons/fa';
import { loginState } from '../../recoil/atom';
import Modal from '../Modal';
import SearchBar from '../SearchBar';

interface headerProps {
  type: 'header';
  // isLogin: boolean;
}
interface searchHeaderProps {
  type: 'searchHeader';
  // isLogin: boolean;
  // setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: React.MouseEventHandler<HTMLButtonElement>;
  onSearchWordChange: React.ChangeEventHandler<HTMLInputElement>;
  searchWord: string;
}
type Props = headerProps | searchHeaderProps;
function Header(props: Props): JSX.Element {
  const isLoggedIn = useRecoilValue(loginState);
  const [modal, setModal] = useState(false);
  const prop = { ...props };
  const toggleModal = () => {
    setModal(!modal);
  };
  return (
    <>
      {modal && <Overlay onClick={() => setModal(false)} />}
      <MainHeader>
        <Logo>world cup</Logo>
        <RightHeader>
          {prop.type === 'searchHeader' ? (
            <SearchBar
              onSubmit={prop.onSubmit}
              onSearchWordChange={prop.onSearchWordChange}
              searchWord={prop.searchWord}
            />
          ) : (
            ''
          )}
          {isLoggedIn ? (
            <UserIcon onClick={toggleModal} />
          ) : (
            <Login>
              <Link to="/login">로그인</Link>
            </Login>
          )}
          {modal && prop.type === 'searchHeader' && <Modal open={modal} setModal={setModal} />}
        </RightHeader>
      </MainHeader>
    </>
  );
}
const MainHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 140px;
  padding: 20px 100px;
  background-color: ${({ theme }) => theme.color.primary};
`;
const Logo = styled.span`
  font-size: 70px;
  font-family: Rancho;
  color: #b89068;
  cursor: pointer;
`;
const RightHeader = styled.span`
  width: 50%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
const Login = styled.span`
  font:  ${({ theme }) => theme.fontStyle.h2Bold}
  cursor: pointer;
  margin-left: 40px;
`;
const UserIcon = styled(FaUserAlt)`
  width: 58px;
  height: 58px;
  color: ${({ theme }) => theme.color.gray[0]}
  cursor: pointer;
  margin-left: 50px;
`;
const Overlay = styled.div`
  position: fixed;
  overflow-y: scroll;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

export default Header;
