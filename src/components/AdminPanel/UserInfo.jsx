import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { useParams, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import serverQueries from '../../serverQueries';

const UserInfoBlock = styled.div`
  padding: 20px;
  font-size: 24px;
`;

const Clear = styled.span`
  color: green;
`;

const Banned = styled.span`
  color: red;
`;

const UserInfo = () => {
  const [user, setUser] = useState({});
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    serverQueries.getUserById(id).then(setUser);
  }, []);

  const handleBan = dt => () =>
    serverQueries
      .blackListRequest(id, dt)
      .then(({ id: userId }) => serverQueries.getUserById(userId).then(setUser));

  const { nickName, accountNonLocked } = user;

  return (
    <div>
      <Button type="primary" onClick={() => history.go(-1)}>
        Назад
      </Button>
      <UserInfoBlock>
        <p>
          Никнейм: <b>{nickName}</b>
        </p>
        <p>
          Статус бана: {accountNonLocked ? <Clear>Отсутствует</Clear> : <Banned>Забанен</Banned>}
        </p>
        {accountNonLocked && (
          <Button type="danger" onClick={handleBan(Date.now() + 60 * 1000)}>
            Забанить
          </Button>
        )}
        {!accountNonLocked && (
          <Button type="primary" onClick={handleBan(Date.now())}>
            Разбанить
          </Button>
        )}
      </UserInfoBlock>
    </div>
  );
};

export default UserInfo;
