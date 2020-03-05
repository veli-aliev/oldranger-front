import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import serverQueries from '../../serverQueries';
import { dateToDateDistance } from '../../utils';
import LinkToUserPage from './LinkToUserPage';

const AdminPanel = () => {
  const [usersList, setUsersList] = useState([]);
  const [pageParams, setPageParams] = useState({ total: 0, pageSize: 5, currentPage: 0 });

  useEffect(() => {
    serverQueries.getUsersList(0).then(({ users, usersCount }) => {
      setUsersList(users);
      setPageParams({ total: usersCount });
    });
  }, []);

  const handlepageChange = ({ current }) => {
    serverQueries.getUsersList(current - 1).then(({ users }) => {
      setUsersList(users);
    });
    setPageParams({ currentPage: current });
  };

  const columns = [
    {
      title: 'Никнейм',
      dataIndex: 'nickName',
      render: (text, { userStatisticId }) => <LinkToUserPage id={userStatisticId} />,
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Зарегистрирован',
      dataIndex: 'registered',
      render: dt => dateToDateDistance(dt),
    },
    {
      title: 'Последний визит',
      dataIndex: 'lastVizit',
      render: dt => dateToDateDistance(dt),
    },
    {
      title: 'Роль',
      dataIndex: 'role',
      render: roleName =>
        roleName
          .split('ROLE_')
          .join('')
          .toLowerCase(),
    },
  ];

  return (
    <div>
      <h2>Панель управления</h2>
      <Table
        rowKey="email"
        columns={columns}
        dataSource={usersList}
        pagination={pageParams}
        onChange={handlepageChange}
      />
    </div>
  );
};

export default AdminPanel;
