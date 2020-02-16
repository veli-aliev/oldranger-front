import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import serverQueries from '../../serverQueries';
import { dateToDateDistance } from '../../utils';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [pageParams, setPageParams] = useState({ total: 50, pageSize: 5, currentPage: 0 });

  useEffect(() => {
    serverQueries.getUsersList(0).then(setUsers);
  }, []);

  const handlepageChange = ({ current }) => {
    serverQueries.getUsersList(current - 1).then(setUsers);
    setPageParams({ currentPage: current });
  };

  const columns = [
    {
      title: 'Nickname',
      dataIndex: 'nickName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Registered',
      dataIndex: 'registered',
      render: dt => dateToDateDistance(dt),
    },
    {
      title: 'Last visit',
      dataIndex: 'lastVizit',
      render: dt => dateToDateDistance(dt),
    },
    {
      title: 'Role',
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
        dataSource={users}
        pagination={pageParams}
        onChange={handlepageChange}
      />
    </div>
  );
};

export default AdminPanel;
