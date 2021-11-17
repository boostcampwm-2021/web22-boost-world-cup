import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import '@fontsource/rancho';
import { FaUserAlt } from 'react-icons/fa';
import { loginState } from '../../recoil/atom';
import HeaderModal from './HeaderModal';
import SearchBar from '../SearchBar';

interface headerProps {
  type: 'header';
}
interface searchHeaderProps {
  type: 'searchHeader';
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
        <Link to="/main">
          <Logo>world cup</Logo>
        </Link>
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
          <LoginWrapper>
            {isLoggedIn ? (
              <UserIcon onClick={toggleModal} />
            ) : (
              <Login>
                <Link to="/login">로그인</Link>
              </Login>
            )}
          </LoginWrapper>
          {modal && <HeaderModal open={modal} setModal={setModal} />}
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
  height: 100px;
  padding: 2rem 5rem;
  background-color: ${({ theme }) => theme.color.primary};
`;
const Logo = styled.span`
  font-size: 3rem;
  font-family: Rancho;
  color: #b89068;
  cursor: pointer;
`;
const RightHeader = styled.span`
  width: 50%;
  height: 5em;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
const LoginWrapper = styled.div`
  width: 10em;
  text-align: center;
  line-height: 1;
`;
const Login = styled.span`
  font: ${({ theme }) => theme.fontStyle.h2Bold};
  cursor: pointer;
`;
const UserIcon = styled(FaUserAlt)`
  width: 2em;
  height: 2em;
  color: ${({ theme }) => theme.color.black};
  cursor: pointer;
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
