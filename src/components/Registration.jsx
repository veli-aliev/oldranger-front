import React, { useState } from 'react';
import { Form as AntForm, Button } from 'antd';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

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
  password: Yup.string()
    .required('Это поле обязательно')
    .min(8, 'Минимальная длина пароля - 8 символов')
    .max(40, 'Максимальная длина пароля - 40 символов')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)./, 'Пароль должен содержать символы A-Z, a-z, 0-9'),
  email: Yup.string()
    .email('Некорректный email адрес')
    .required('Это поле обязательно'),
});

const register = changeLoadingState => async values => {
  changeLoadingState(true);
  const formData = new FormData();
  formData.append('username', values.username);
  formData.append('password', values.password);
  await axios.post('http://localhost:8888/login', formData, {
    headers: { 'content-type': 'multipart/form-data' },
    withCredentials: true,
  });
  changeLoadingState(false);
};

const Registration = () => {
  const [loading, changeLoadingState] = useState(false);
  // const { token } = useParams();

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
        email: '',
      }}
      validationSchema={validationSchema}
      onSubmit={register(changeLoadingState)}
    >
      {({ handleSubmit, status = {} }) => (
        <>
          {Object.keys(status).map(item => (
            <p key={status[item]}>{`${item} : ${status[item]}`}</p>
          ))}
          <AntForm onSubmit={handleSubmit} {...formLayoutSchema}>
            <MyTextInput label="Username" name="username" type="text" maxLength={50} />
            <MyTextInput label="Password" name="password" type="text" />
            <MyTextInput label="Email" name="email" type="text" />

            <AntForm.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit" loading={loading}>
                Submit
              </Button>
            </AntForm.Item>
          </AntForm>
        </>
      )}
    </Formik>
  );
};

export default Registration;
