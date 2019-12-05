import React, { useState } from 'react';
import { Form as AntForm, Button } from 'antd';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import styled from 'styled-components';

import Context from './Context';
import MyTextInput from './formItems/MyTextInput';

const StyledWrapper = styled.div`
  padding: 5px;
`;

const formLayoutSchema = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 12,
      offset: 11,
    },
  },
};

const validationSchema = Yup.object({
  username: Yup.string().required('Это поле обязательно'),
  password: Yup.string().required('Это поле обязательно'),
});

const login = (changeLoginState, changeLoadingState) => async values => {
  changeLoadingState(true);
  const formData = new FormData();
  formData.append('username', values.username);
  formData.append('password', values.password);
  await axios.post('http://localhost:8888/login', formData, {
    headers: { 'content-type': 'multipart/form-data' },
    withCredentials: true,
  });
  changeLoginState();
  changeLoadingState(false);
};

const Login = () => {
  const [loading, changeLoadingState] = useState(false);

  return (
    <StyledWrapper>
      <Context.Consumer>
        {({ changeLoginState }) => (
          <Formik
            initialValues={{
              username: 'Prospect',
              password: 'prospect',
            }}
            validationSchema={validationSchema}
            onSubmit={login(changeLoginState, changeLoadingState)}
          >
            {({ handleSubmit, status = {} }) => (
              <>
                {Object.keys(status).map(item => (
                  <p key={status[item]}>{`${item} : ${status[item]}`}</p>
                ))}
                <AntForm onSubmit={handleSubmit} {...formLayoutSchema}>
                  <MyTextInput label="User Name" name="username" type="text" />
                  <MyTextInput label="Password" name="password" type="text" />

                  <AntForm.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" loading={loading}>
                      Submit
                    </Button>
                  </AntForm.Item>
                </AntForm>
              </>
            )}
          </Formik>
        )}
      </Context.Consumer>
    </StyledWrapper>
  );
};

export default Login;
