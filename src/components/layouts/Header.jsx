import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from 'antd';
import logo from '../../media/img/logo.png';

import Context from '../Context';

const StyledHeader = styled.div`
  padding-top: 10px;
  padding-bottom: 20px;
`;

const WrapLogo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
`;

const Logo = styled.img`
  width: 110px;
  height: 95px;
`;

const LogoText = styled.h1`
  font-family: 'MusorC';
  font-weight: normal;
  font-size: 28px;
  margin: 0;
`;

const Menu = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Header = () => {
  return (
    <Context.Consumer>
      {({ isLogin, logOut, user }) => (
        <StyledHeader>
          <WrapLogo>
            <Logo src={logo} alt='Клуб "Старый следопыт"' />
            <LogoText>Клуб &quot;Старый следопыт&quot;</LogoText>
          </WrapLogo>
          <Menu>
            <Button type="primary">
              <Link to="/">Главная</Link>
            </Button>
            <Button type="primary">
              <Link to="/chat">Чат</Link>
            </Button>
            {isLogin && user.role === 'ROLE_ADMIN' && (
              <Button>
                <Link to="/article/create">Написать статью</Link>
              </Button>
            )}
            {isLogin && (
              <Button>
                <Link to="/articles">Статьи</Link>
              </Button>
            )}
            {isLogin && user.role === 'ROLE_ADMIN' && (
              <Button style={{ marginLeft: '0' }}>
                <Link to="/admin-panel">Панель администратора</Link>
              </Button>
            )}
            {isLogin ? (
              <>
                <Button>
                  <Link to="/profile">Профиль</Link>
                </Button>
                <Button type="danger" onClick={logOut}>
                  Выйти
                </Button>
              </>
            ) : (
              <Button type="link">
                <Link to="/login">Войти</Link>
              </Button>
            )}
          </Menu>
        </StyledHeader>
      )}
    </Context.Consumer>
  );
};

export default Header;
