import React from 'react';
import { Button } from 'antd';

import './css/Greeting.css';

const Greeting = ({ handleConnect }) => (
  <div className="greeting">
    <div className="greeting-container">
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
    </div>
  </div>
);

export default Greeting;
