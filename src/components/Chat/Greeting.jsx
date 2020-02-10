import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { GreetingContainer } from './styled';

const Greeting = ({ handleConnect }) => (
  <div className="greeting">
    <GreetingContainer>
      <h1 className="title">Общий Чат</h1>
      <p>Познакомьтесь с Клубом и общайтесь с другими участниками!</p>
      <div className="form-group">
        <Button
          htmlType="submit"
          type="primary"
          className="accent greeting-submit"
          onClick={handleConnect}
        >
          Присоединиться
        </Button>
      </div>
    </GreetingContainer>
  </div>
);

export default Greeting;

Greeting.propTypes = {
  handleConnect: PropTypes.func.isRequired,
};
