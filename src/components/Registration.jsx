import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Row, Divider } from 'antd';
import { Form, Input } from 'formik-antd';
import { Formik } from 'formik';
import * as Yup from 'yup';

import queries from '../serverQueries';

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
  nickName: Yup.string().required('Это поле обязательно'),
  firstName: Yup.string().required('Это поле обязательно'),
  lastName: Yup.string().required('Это поле обязательно'),
  password: Yup.string()
    .required('Это поле обязательно')
    .min(8, 'Минимальная длина пароля - 8 символов')
    .max(40, 'Максимальная длина пароля - 40 символов')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)./, 'Пароль должен содержать символы A-Z, a-z, 0-9'),
  repeatPassword: Yup.string()
    .required('Это поле обязательно')
    .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать'),
  email: Yup.string()
    .email('Некорректный email адрес')
    .required('Это поле обязательно'),
});

const register = (key, { changeLoadingState }) => async values => {
  changeLoadingState(true);

  await queries.registrationUser({ key, ...values });

  changeLoadingState(false);
};

const Registration = () => {
  const [loading, changeLoadingState] = useState(false);
  const { key } = useParams();

  return (
    <Formik validationSchema={validationSchema} onSubmit={register(key, { changeLoadingState })}>
      <Form {...formLayoutSchema}>
        <FormItem label="Логин" name="userName">
          <Input name="userName" />
        </FormItem>
        <FormItem label="Имя" name="firstName">
          <Input name="firstName" />
        </FormItem>
        <FormItem label="Фамилия" name="lastName">
          <Input name="lastName" />
        </FormItem>
        <Divider />
        <FormItem label="Пароль" name="password">
          <Input.Password name="password" />
        </FormItem>
        <FormItem label="Повторите пароль" name="repeatPassword">
          <Input.Password name="repeatPassword" />
        </FormItem>
        <Divider />
        <FormItem label="Почта" name="email">
          <Input name="email" />
        </FormItem>

        <Row type="flex" justify="center">
          <Button type="primary" htmlType="submit" loading={loading}>
            Зарегистрироваться
          </Button>
        </Row>
      </Form>
    </Formik>
  );
};

export default Registration;
