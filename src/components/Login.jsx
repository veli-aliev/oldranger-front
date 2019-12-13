import React, { useState } from 'react';
import { Form as AntForm, Button } from 'antd';
import { Formik } from 'formik';
import * as Yup from 'yup';

import queries from '../serverQueries';

import Context from './Context';
import MyTextInput from './formItems/MyTextInput';

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
    offset: 10,
  },
};

const validationSchema = Yup.object({
  username: Yup.string().required('Это поле обязательно'),
  password: Yup.string().required('Это поле обязательно'),
});

const login = (changeLoginState, changeUserState, changeLoadingState) => async values => {
  changeLoadingState(true);
  const formData = new FormData();
  formData.append('username', values.username);
  formData.append('password', values.password);

  await queries.logIn(formData);
  const profile = await queries.getProfileData();

  changeLoginState();
  changeUserState(profile);
  changeLoadingState(false);
};

const Login = () => {
  const [loading, changeLoadingState] = useState(false);

  return (
    <Context.Consumer>
      {({ changeLoginState, changeUserState }) => (
        <Formik
          initialValues={{
            username: 'Prospect',
            password: 'prospect',
          }}
          validationSchema={validationSchema}
          onSubmit={login(changeLoginState, changeUserState, changeLoadingState)}
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
                    Отправить
                  </Button>
                </AntForm.Item>
              </AntForm>
            </>
          )}
        </Formik>
      )}
    </Context.Consumer>
  );
};

export default Login;
