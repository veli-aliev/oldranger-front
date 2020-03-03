import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Menu, Dropdown, Icon, Modal, Button } from 'antd';
import context from '../Context';
import serverQueries from '../../serverQueries';

const AdminMenu = ({ user, updateUser }) => {
  const {
    isLogin,
    user: { role },
  } = useContext(context);

  const handleBan = dt => () =>
    serverQueries
      .blackListRequest(user.id, dt)
      .then(({ id: userId }) => serverQueries.getUserById(userId).then(updateUser));

  const openConfirm = (action, content) => () => {
    Modal.confirm({
      title: 'Confirmation',
      content: (
        <div>
          Вы хотите подтвердить действие: <b>{content}</b> для пользователя: <b>{user.nickName}</b>
        </div>
      ),
      onOk: action,
    });
  };

  const oneHour = 60 * 60 * 1000;

  const menu = (
    <Menu>
      <Menu.Item onClick={openConfirm(handleBan(Date.now() + 24 * oneHour), 'ban 24 hours')}>
        ban 24 hours
      </Menu.Item>
      <Menu.Item onClick={openConfirm(handleBan(Date.now() + 7 * 24 * oneHour), 'ban 7 days')}>
        ban 7 days
      </Menu.Item>
      <Menu.Item
        onClick={openConfirm(handleBan(Date.now() + 9999 * 24 * oneHour), 'ban permanent')}
      >
        ban permanent
      </Menu.Item>
    </Menu>
  );

  if (!isLogin || role !== 'ROLE_ADMIN') {
    return null;
  }

  return user.accountNonLocked ? (
    <Dropdown overlay={menu} trigger={['click']}>
      <Button className="ant-dropdown-link">
        Доп. действия
        <Icon type="down" />
      </Button>
    </Dropdown>
  ) : (
    <Button onClick={openConfirm(handleBan(Date.now()), 'unban')}>Раблокировать</Button>
  );
};

AdminMenu.propTypes = {
  user: PropTypes.instanceOf(Object).isRequired,
  updateUser: PropTypes.func,
};

AdminMenu.defaultProps = {
  updateUser: () => {},
};

export default AdminMenu;
