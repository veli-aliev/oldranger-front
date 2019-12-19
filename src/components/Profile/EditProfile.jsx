import React, { useState } from 'react';
import { Button } from 'antd';
import { Form, Input, Select, DatePicker } from 'formik-antd';
import { Formik } from 'formik';
import * as Yup from 'yup';

import queries from '../../serverQueries';

import Context from '../Context';
import FormItem from '../formItems/FormItem';

const { Option } = Select;
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

const tailFormItemLayout = {
  wrapperCol: {
    offset: 10,
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

const submitForm = changeLoadingState => async values => {
  changeLoadingState(true);
  const formData = new FormData();
  Object.keys(values).forEach(key => formData.append(key, values[key]));
  queries.updateProfile(formData);
  changeLoadingState(false);
};

const EditProfile = () => {
  const [loading, changeLoadingState] = useState(false);

  return (
    <Context.Consumer>
      {({ user }) => (
        <Formik
          initialValues={{ ...user }}
          validationSchema={validationSchema}
          onSubmit={submitForm(changeLoadingState)}
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

                <FormItem label="ДР" name="birthday">
                  <DatePicker name="birthday" />
                </FormItem>
                <FormItem label="Пол" name="gender">
                  <Select defaultValue="lucy" name="gender">
                    <Option value="male">Муж.</Option>
                    <Option value="female">Жен.</Option>
                  </Select>
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

                <FormItem isButtonWrapper {...tailFormItemLayout}>
                  <Button type="primary" htmlType="submit" loading={loading}>
                    Отправить
                  </Button>
                </FormItem>
              </Form>
            </>
          )}
        </Formik>
      )}
    </Context.Consumer>
  );
};

export default EditProfile;
