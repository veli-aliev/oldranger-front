import React from 'react';
import { Result, Button, Statistic } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const WrapperResult = styled.div`
  display: ${props => (props.isLock ? 'block' : 'none')};
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(24, 144, 255, 0.8);
`;

const LockStatus = ({ isLock, setLockStatus }) => {
  const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;
  return (
    <WrapperResult isLock={isLock}>
      <Result
        status="403"
        extra={
          <div>
            <Statistic.Countdown title="Day Level" value={deadline} format="D 天 H 时 m 分 s 秒" />
            <Button type="primary" onClick={() => setLockStatus(false)}>
              Назад
            </Button>
          </div>
        }
      />
    </WrapperResult>
  );
};

LockStatus.propTypes = {
  setLockStatus: PropTypes.func.isRequired,
  isLock: PropTypes.bool.isRequired,
};

export default LockStatus;
