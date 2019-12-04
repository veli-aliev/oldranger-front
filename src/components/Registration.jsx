import React from 'react';
import { Form as AntForm, Button } from 'antd';
import { Formik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';

import MyTextInput from './formItems/MyTextInput';

const StyledWrapper = styled.div`
  padding: 10px;
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
  password: Yup.string()
    .required('Это поле обязательно')
    .min(8, 'Минимальная длина пароля - 8 символов')
    .max(40, 'Максимальная длина пароля - 40 символов')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)./, 'Пароль должен содержать символы A-Z, a-z, 0-9'),
  email: Yup.string()
    .email('Некорректный email адрес')
    .required('Это поле обязательно'),
});

const Registration = () => {
  // const { token } = useParams();

  return (
    <StyledWrapper>
      <Formik
        initialValues={{
          username: '',
          password: '',
          email: '',
        }}
        validationSchema={validationSchema}
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
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </AntForm.Item>
            </AntForm>
          </>
        )}
      </Formik>
    </StyledWrapper>
  );
};

export default Registration;
