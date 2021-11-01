import React, { useState } from 'react';
import styled from 'styled-components';
import '@fontsource/rancho';
import { FaUserAlt } from 'react-icons/fa';
import theme from '../../commons/style/theme';
import Modal from '../Modal';

const MainHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 140px;
  padding: 20px 100px;
  background-color: ${theme.color.primary};
`;
const Logo = styled.span`
  font-size: 70px;
  font-family: Rancho;
  color: #b89068;
  cursor: pointer;
`;
const RightHeader = styled.span`
  width: 400px;
  display: flex;
  justify-content: space-between;
`;
const Login = styled.span`
  font: ${theme.fontStyle.h2Bold};
  cursor: pointer;
`;
const UserIcon = styled(FaUserAlt)`
  width: 58px;
  height: 58px;
  color: ${theme.color.gray[0]};
  cursor: hover;
`;
interface Props {
  isLogin: boolean;
  canSearch: boolean;
}
function Header({ isLogin, canSearch }: Props): JSX.Element {
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };
  return (
    <MainHeader>
      <Logo>world cup</Logo>
      <RightHeader>
        {canSearch ? <input /> : ''}
        {isLogin ? <UserIcon onClick={toggleModal} /> : <Login>로그인</Login>}
        <Modal open={modal} />
      </RightHeader>
    </MainHeader>
  );
}

export default Header;
