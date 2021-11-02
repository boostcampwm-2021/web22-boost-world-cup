import React, { useState } from 'react';
import styled from 'styled-components';
import '@fontsource/rancho';
import { FaUserAlt } from 'react-icons/fa';
import Modal from '../Modal';
import SearchBar from '../SearchBar';

interface Props {
  isLogin: boolean;
  canSearch: boolean;
  onSubmit: React.MouseEventHandler<HTMLButtonElement>;
  onSearchWordChange: React.ChangeEventHandler<HTMLInputElement>;
  searchWord: string;
}
function Header({ isLogin, canSearch, onSubmit, onSearchWordChange, searchWord }: Props): JSX.Element {
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };
  return (
    <MainHeader>
      <Logo>world cup</Logo>
      <RightHeader>
        {canSearch ? (
          <SearchBar onSubmit={onSubmit} onSearchWordChange={onSearchWordChange} searchWord={searchWord} />
        ) : (
          ''
        )}
        {isLogin ? <UserIcon onClick={toggleModal} /> : <Login>로그인</Login>}
        <Modal open={modal} />
      </RightHeader>
    </MainHeader>
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
  justify-content: space-between;
`;
const Login = styled.span`
  font:  ${({ theme }) => theme.fontStyle.h2Bold}
  cursor: pointer;
`;
const UserIcon = styled(FaUserAlt)`
  width: 58px;
  height: 58px;
  color: ${({ theme }) => theme.color.gray[0]}
  cursor: pointer;
`;

export default Header;
