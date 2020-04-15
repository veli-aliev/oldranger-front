import React, { useState } from 'react';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import { Radio } from 'antd';
import styled from 'styled-components';
import UsersList from './UsersList';
import UserInfo from './UserInfo';
import MailingLetters from './MailingLetters';
import ArticleCreate from './ArticleCreate';

const AdminPanelHeader = styled.div`
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const AdminPanel = () => {
  const { path } = useRouteMatch();
  const history = useHistory();
  const [selectedUrl, setUrl] = useState('');

  const changeUrl = ({ target: { value } }) => {
    history.push(`${path}/${value}`);
    setUrl(value);
  };

  return (
    <div>
      <AdminPanelHeader>
        <h1>Панель управления</h1>
        <Radio.Group value={selectedUrl} onChange={changeUrl}>
          <Radio.Button value="">Список пользователей</Radio.Button>
          <Radio.Button value="mail">Рассылка сообщений</Radio.Button>
          <Radio.Button value="article-create">Создать статью</Radio.Button>
        </Radio.Group>
      </AdminPanelHeader>
      <Switch>
        <Route path={`${path}/`} exact component={UsersList} />
        <Route path={`${path}/users/:id`} exact component={UserInfo} />
        <Route path={`${path}/mail`} exact component={MailingLetters} />
        <Route path={`${path}/article-create`} exact component={ArticleCreate} />
      </Switch>
    </div>
  );
};

export default AdminPanel;
