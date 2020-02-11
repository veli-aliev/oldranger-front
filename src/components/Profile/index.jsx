import React, { useState } from 'react';
import { Switch, Route, useHistory, useRouteMatch, useLocation } from 'react-router-dom';
import { Radio } from 'antd';

import EditProfile from './EditProfile';
import EditAvatar from './EditAvatar';

import MainProfile from './MainProfile';
import Messages from './Messages';
import Themes from './Themes';
import Subscriptions from './Subscriptions';
import Invite from './Invite';
import Albums from './Albums';
import Album from './Album';

const Profile = () => {
  const { path } = useRouteMatch();
  const history = useHistory();
  const { pathname } = useLocation();
  const endPoint = pathname.split('/').pop();
  const [currentPage, setPage] = useState(endPoint === 'profile' ? '' : endPoint);

  const changePage = ({ target: { value } }) => {
    history.push(`${path}/${value}`);
    setPage(value);
  };

  return (
    <Switch>
      <Route path={`${path}/edit`} component={EditProfile} />
      <Route path={`${path}/avatar`} component={EditAvatar} />
      <Route path="*">
        <h2>Профиль пользователя</h2>
        <div>
          <Radio.Group value={currentPage} onChange={changePage} style={{ marginBottom: 20 }}>
            <Radio.Button value="">Профиль</Radio.Button>
            <Radio.Button value="messages">Сообщения</Radio.Button>
            <Radio.Button value="themes">Темы</Radio.Button>
            <Radio.Button value="subscriptions">Подписки</Radio.Button>
            <Radio.Button value="invite">Пригласить друга</Radio.Button>
            <Radio.Button value="albums">Мои альбомы</Radio.Button>
          </Radio.Group>
        </div>
        <Switch>
          <Route exact path={`${path}/`} component={MainProfile} />
          <Route path={`${path}/messages`} component={Messages} />
          <Route path={`${path}/themes`} component={Themes} />
          <Route path={`${path}/subscriptions`} component={Subscriptions} />
          <Route path={`${path}/invite`} component={Invite} />
          <Route exact path={`${path}/albums/:id`} component={Album} />
          <Route path={`${path}/albums`} component={Albums} />
        </Switch>
      </Route>
    </Switch>
  );
};

export default Profile;
