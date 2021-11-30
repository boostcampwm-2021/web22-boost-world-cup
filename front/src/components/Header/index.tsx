import React, { useState, useContext, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import '@fontsource/rancho';
import { FaUserAlt } from 'react-icons/fa';
import HeaderModal from './HeaderModal';
import SearchBar from '../SearchBar';
import { UserStateContext } from '../../stores/userStore';
import { MAIN } from '../../constants/route';

interface headerProps {
  type: 'header';
}
interface searchHeaderProps {
  type: 'searchHeader';
  onSubmit: React.MouseEventHandler<HTMLButtonElement>;
  onSearchWordChange: React.ChangeEventHandler<HTMLInputElement>;
  searchWord: string;
  onResetData?: () => void;
}
type Props = headerProps | searchHeaderProps;

function Header(props: Props): JSX.Element {
  const { isLoggedIn } = useContext(UserStateContext);
  const location = useLocation();
  const history = useHistory();
  const url = useMemo(() => history.location.pathname.split('/')[1], []);
  const [modal, setModal] = useState(false);
  const prop = { ...props };
  const toggleModal = () => {
    setModal(!modal);
  };
  const onMoveMainPage = () => {
    if (url === 'main' && props.type === 'searchHeader' && props.onResetData) {
      props.onResetData();
      return;
    }
    history.push(MAIN);
  };
  return (
    <>
      {modal && <Overlay onClick={() => setModal(false)} />}
      <MainHeader>
        <Logo onClick={onMoveMainPage}>world cup</Logo>
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
          <>
            {isLoggedIn ? (
              <UserIcon onClick={toggleModal} />
            ) : (
              <Link
                to={{
                  pathname: '/login',
                  state: { from: location.pathname },
                }}
              >
                <Login>로그인</Login>
              </Link>
            )}
          </>
          {modal && <HeaderModal open={modal} setModal={setModal} />}
        </RightHeader>
      </MainHeader>
    </>
  );
}

const Login = styled.div`
  margin-right: 30px;
  cursor: pointer;
  font: ${({ theme }) => theme.fontStyle.body};
  color: gray;
  border: 1px solid gray;
  background-color: transparent;
  font-size: 15px;
  width: 100px;
  height: 35px;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  &:hover {
    color: white;
    background-color: #bc8f8f;
    border: none;
  }
`;

const UserIcon = styled(FaUserAlt)`
  margin-right: 50px;
  width: 30px;
  height: 30px;
  color: ${({ theme }) => theme.color.black};
  cursor: pointer;
`;

const MainHeader = styled.header`
  display: flex;
  width: 100%;
  height: 100px;
  padding: 2rem 2rem;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.color.primary};
`;

const Logo = styled.span`
  cursor: pointer;
  font-size: 40px;
  font-family: Rancho;
  color: ${({ theme }) => theme.color.logo};
`;
const RightHeader = styled.span`
  display: flex;
  width: 400px;
  height: 70px;
  align-items: center;
  justify-content: flex-end;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

export default Header;
