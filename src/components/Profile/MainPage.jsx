import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Spin } from 'antd';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/ru';

const StyledCard = styled.div`
  position: relative;
  padding: 20px 0 10px 20px;
  margin-top: 8px;
  margin-bottom: 30px;
  border: 1px solid #555;
  border-radius: 5px;
  .title {
    position: absolute;
    left: 4px;
    top: 0;
    transform: translateY(-50%);
    padding: 5px 10px;
    line-height: 1;
    color: #fff;
    background-color: #2b7de9;
    border-radius: 4px;
  }
  .field {
    display: flex;
    margin: 2px 0;
    &-name {
      width: 30%;
    }
  }
`;

const StyledMainProfile = styled.div`
  display: flex;
  flex-wrap: wrap;
  .sidebar {
    width: 20%;
    margin: 0 auto 5%;
    .title {
      margin: 20px 0;
    }
    .avatar {
      display: block;
      max-width: 200px;
      width: 100%;
      height: auto;
      margin: 0 auto;
    }
    .button {
      margin-bottom: 10px;
    }
  }
  .meta {
    width: 75%;
    margin: auto;
  }
  @media (max-width: 768px) {
    .sidebar,
    .meta {
      width: 100%;
    }
  }
`;

const getProfile = async (changeUserState, changeLoadState) => {
  const res = await axios.get('http://localhost:8888/api/profile', {
    withCredentials: true,
  });
  changeUserState(res.data);
  changeLoadState(true);
};

const MainProfile = () => {
  const [isLoaded, changeLoadState] = useState(false);
  const [user, changeUserState] = useState({});

  useEffect(() => {
    getProfile(changeUserState, changeLoadState);
  }, []);

  return isLoaded ? (
    <StyledMainProfile>
      <div className="sidebar">
        <img
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          alt="avatar"
          className="avatar"
        />
        <h2 className="title">Name</h2>
        <Button type="primary" block className="button">
          Загрузить аватар
        </Button>
        <Button type="primary" block className="button">
          Редактировать
        </Button>
      </div>
      <div className="meta">
        <StyledCard>
          <h3 className="title">Общее</h3>
          <div className="field">
            <div className="field-name">Ник:</div>
            <div className="field-value">{user.nickName}</div>
          </div>
          <div className="field">
            <div className="field-name">Имя:</div>
            <div className="field-value">{user.firstName}</div>
          </div>
          <div className="field">
            <div className="field-name">Фамилия:</div>
            <div className="field-value">{user.lastName}</div>
          </div>
          <div className="field">
            <div className="field-name">Дата рождения:</div>
            <div className="field-value">-</div>
          </div>
          <div className="field">
            <div className="field-name">Пол:</div>
            <div className="field-value">-</div>
          </div>
          <div className="field">
            <div className="field-name">Город:</div>
            <div className="field-value">-</div>
          </div>
        </StyledCard>
        <StyledCard>
          <h3 className="title">Общее</h3>
          <div className="field">
            <div className="field-name">Email:</div>
            <div className="field-value">{user.email}</div>
          </div>
          <div className="field">
            <div className="field-name">Моб. телефон:</div>
            <div className="field-value">-</div>
          </div>
          <div className="field">
            <div className="field-name">VK:</div>
            <div className="field-value">-</div>
          </div>
          <div className="field">
            <div className="field-name">Facebook:</div>
            <div className="field-value">-</div>
          </div>
          <div className="field">
            <div className="field-name">Twitter:</div>
            <div className="field-value">-</div>
          </div>
        </StyledCard>
        <StyledCard>
          <h3 className="title">Общее</h3>
          <div className="field">
            <div className="field-name">Зарегестрирован:</div>
            <div className="field-value">-</div>
          </div>
          <div className="field">
            <div className="field-name">Сообщений:</div>
            <div className="field-value">{user.messageCount}</div>
          </div>
          <div className="field">
            <div className="field-name">Последнее сообщение:</div>
            <div className="field-value">-</div>
          </div>
          <div className="field">
            <div className="field-name">Последний логин:</div>
            <div className="field-value">{moment(user.lastVizit).fromNow()}</div>
          </div>
          <div className="field">
            <div className="field-name">Начал тем:</div>
            <div className="field-value">{user.topicStartCount}</div>
          </div>
        </StyledCard>
        <StyledCard>
          <h3 className="title">Общее</h3>
          <div className="field">-</div>
        </StyledCard>
      </div>
    </StyledMainProfile>
  ) : (
    <Spin />
  );
};

export default MainProfile;
