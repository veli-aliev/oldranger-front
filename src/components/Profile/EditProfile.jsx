import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Row } from 'antd';
import { Form, Input } from 'formik-antd';
import { Formik } from 'formik';
import * as Yup from 'yup';

import queries from '../../serverQueries';

import Context from '../Context';
import FormItem from '../formItems/FormItem';

const { TextArea } = Input;

const formLayoutSchema = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 7 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 10 },
  },
};

const validationSchema = Yup.object({
  nickName: Yup.string().required('Это поле обязательно'),
  firstName: Yup.string().required('Это поле обязательно'),
  lastName: Yup.string().required('Это поле обязательно'),
  email: Yup.string()
    .email()
    .required('Это поле обязательно'),
});

const submitForm = (history, { changeLoadingState, changeUserState }) => async values => {
  changeLoadingState(true);

  queries.updateProfile(values);
  const profile = await queries.getProfileData();

  localStorage.setItem('user', JSON.stringify(profile));

  changeUserState(profile);
  changeLoadingState(false);
  history.push('/profile');
};

const EditProfile = () => {
  const [loading, changeLoadingState] = useState(false);
  const { user, changeUserState } = useContext(Context);
  const history = useHistory();

  return (
    <>
      <Row type="flex" justify="center">
        <h2>Редактирование профиля</h2>
      </Row>
      <Formik
        initialValues={{ ...user }}
        validationSchema={validationSchema}
        onSubmit={submitForm(history, { changeLoadingState, changeUserState })}
      >
        {({ handleSubmit }) => (
          <>
            <Form onSubmit={handleSubmit} {...formLayoutSchema}>
              <FormItem label="Ник" name="nickName">
                <Input name="nickName" />
              </FormItem>
              <FormItem label="Имя" name="firstName">
                <Input name="firstName" />
              </FormItem>
              <FormItem label="Фамилия" name="lastName">
                <Input name="lastName" />
              </FormItem>
              <FormItem label="Почта" name="email">
                <Input name="email" />
              </FormItem>

              <FormItem label="Город" name="city">
                <Input name="city" />
              </FormItem>
              <FormItem label="Страна" name="country">
                <Input name="country" />
              </FormItem>

              <FormItem label="Тел. номер" name="phoneNumber">
                <Input name="phoneNumber" />
              </FormItem>
              <FormItem label="VK" name="socialVk">
                <Input name="socialVk" />
              </FormItem>
              <FormItem label="Facebook" name="socialFb">
                <Input name="socialFb" />
              </FormItem>
              <FormItem label="Twitter" name="socialTw">
                <Input name="socialTw" />
              </FormItem>
              <FormItem label="Обо мне" name="aboutMe">
                <TextArea name="aboutMe" />
              </FormItem>

              <Row type="flex" justify="center">
                <Button type="primary" htmlType="submit" loading={loading}>
                  Редактировать
                </Button>
              </Row>
            </Form>
          </>
        )}
      </Formik>
    </>
  );
};

export default EditProfile;
