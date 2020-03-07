import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Icon } from 'antd';
import { Link } from 'react-router-dom';
import serverQueries from '../../serverQueries';

const LinkToUserPage = ({ id }) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    serverQueries.getUserById(id).then(setUser);
  }, [id]);

  const { nickName, accountNonLocked } = user;

  return (
    <>
      <Link to={`/admin-panel/users/${id}`}>{nickName}</Link>{' '}
      {!isEmpty(user) && !accountNonLocked && <Icon type="lock" style={{ color: '#eb2f96' }} />}
    </>
  );
};

LinkToUserPage.propTypes = {
  id: PropTypes.number.isRequired,
};

export default LinkToUserPage;
