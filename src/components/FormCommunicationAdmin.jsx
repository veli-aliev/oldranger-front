import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Row } from 'antd';
import { Form, Input } from 'formik-antd';
import { Formik } from 'formik';
import * as Yup from 'yup';

import queries from '../serverQueries';

import FormItem from './formItems/FormItem';

const WrapperForm = styled.div``;

const Title = styled.h2`
  text-align: center;
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

const validationSchema = Yup.object({
  firstName: Yup.string().required('Это поле обязательно'),
  lastName: Yup.string().required('Это поле обязательно'),
  email: Yup.string()
    .email('Некорректный email адрес')
    .required('Это поле обязательно'),
});

const FormCommunicationAdmin = () => {
  const [loading, changeLoadingState] = useState(false);
  const [value, setValue] = useState('');

  const onChangeValue = ({ target }) => {
    setValue(target.value);
  };

  const register = (values, { setStatus, onReset }) => {
    changeLoadingState(true);
    setStatus('');
    queries
      .newUser({ ...values, adout: value })
      .then(() => {
        setStatus('Письмо с подтверждением отправлено на ваш email');
        onReset();
      })
      .catch(() => {
        setStatus('Ошибка');
      });
    changeLoadingState(false);
  };
  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        about: '',
      }}
      validationSchema={validationSchema}
      onSubmit={register}
    >
      {({ status }) => (
        <>
          <WrapperForm>
            <Title>Связаться с администратором</Title>
            {status && (
              <Row type="flex" justify="center">
                <h3>{status}</h3>
              </Row>
            )}
            <Form {...formLayoutSchema}>
              <FormItem label="Имя" name="firstName">
                <Input name="firstName" />
              </FormItem>
              <FormItem label="Фамилия" name="lastName">
                <Input name="lastName" />
              </FormItem>
              <FormItem label="Почта" name="email">
                <Input name="email" />
              </FormItem>
              <FormItem label="О себе" name="about">
                <Input.TextArea rows={4} onChange={onChangeValue} value={value} />
              </FormItem>
              <Row type="flex" justify="center">
                <Button type="primary" htmlType="submit" loading={loading}>
                  Отправить
                </Button>
              </Row>
            </Form>
          </WrapperForm>
        </>
      )}
    </Formik>
  );
};

export default FormCommunicationAdmin;
