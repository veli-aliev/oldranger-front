import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from 'antd';

import Context from '../Context';

const StyledHeader = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  padding: 10px 0;
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
  > button {
    margin-right: 20px;
  }
`;

const LeftWrapper = styled.div`
  margin-right: auto;
  > button {
    margin-right: 20px;
  }
`;

const RightWrapper = styled.div`
  > button {
    margin-left: 20px;
  }
`;

const Header = () => {
  return (
    <Context.Consumer>
      {({ isLogin, logOut, user }) => (
        <StyledHeader>
          <LeftWrapper>
            <Button type="primary">
              <Link to="/">Home</Link>
            </Button>
          </LeftWrapper>
          <RightWrapper>
            {isLogin && user.id === 1 && (
              <Button>
                <Link to="/admin-panel">Admin panel</Link>
              </Button>
            )}
            {isLogin ? (
              <>
                <Button>
                  <Link to="/profile">Profile</Link>
                </Button>
                <Button type="danger" onClick={logOut}>
                  Exit
                </Button>
              </>
            ) : (
              <Button type="link">
                <Link to="/login">log in</Link>
              </Button>
            )}
          </RightWrapper>
        </StyledHeader>
      )}
    </Context.Consumer>
  );
};

export default Header;
