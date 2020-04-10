import React, { useState, useContext } from 'react';
import { Button, Row, message } from 'antd';
import { Form, Input } from 'formik-antd';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { showMessageNetError } from '../utils';

import queries from '../serverQueries';
import Context from './Context';
import FormItem from './formItems/FormItem';

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

const validationSchema = Yup.object({
  username: Yup.string().required('Это поле обязательно'),
  password: Yup.string().required('Это поле обязательно'),
});

const login = ({ changeLoginState, changeUserState, changeLoadingState }) => async (
  values,
  { setStatus }
) => {
  changeLoadingState(true);
  const formData = new FormData();
  formData.append('username', values.username);
  formData.append('password', values.password);

  if (navigator.onLine) {
    try {
      await queries.logIn(formData);
      const userData = await queries.getProfileData();

      localStorage.setItem('user', JSON.stringify(userData));

      setStatus('');
      changeLoginState();
      changeUserState(userData);
    } catch (error) {
      if (error.message === 'Network Error') {
        message.error('Сетевая ошибка');
      } else if (error.message !== 'Network Error') {
        showMessageNetError(error);
      } else if (error.response.status === 401) {
        setStatus('Проверьте правильность ввода логина и пароля');
      }
    }
  } else {
    message.error('Проверьте подключение к сети');
  }
  changeLoadingState(false);
};

const Login = () => {
  const [loading, changeLoadingState] = useState(false);
  const { changeLoginState, changeUserState } = useContext(Context);
  return (
    <Formik
      initialValues={{
        username: 'Admin',
        password: 'admin',
      }}
      validationSchema={validationSchema}
      onSubmit={login({ changeLoginState, changeUserState, changeLoadingState })}
    >
      {({ status }) => (
        <>
          {status && (
            <Row type="flex" justify="center">
              <h3>{status}</h3>
            </Row>
          )}
          <Form {...formLayoutSchema}>
            <FormItem label="Логин" name="username">
              <Input name="username" />
            </FormItem>
            <FormItem label="Пароль" name="password">
              <Input.Password name="password" />
            </FormItem>

            <Row type="flex" justify="center">
              <Button type="primary" htmlType="submit" loading={loading}>
                Войти
              </Button>
            </Row>
          </Form>
        </>
      )}
    </Formik>
  );
};

export default Login;
