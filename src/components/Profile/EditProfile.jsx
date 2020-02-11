import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Row } from 'antd';
import locale from 'antd/es/date-picker/locale/ru_RU';
import { Form, Input, Select, DatePicker } from 'formik-antd';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { parseIncompletePhoneNumber } from 'libphonenumber-js';
import moment from 'moment';
import 'moment/locale/ru';

import queries from '../../serverQueries';

import Context from '../Context';
import FormItem from '../formItems/FormItem';
import PhoneInput from '../formItems/PhoneInput';

moment.locale('ru');

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

const regex = {
  fb: /(?:(?:http|https):\/\/)?(?:www.)?facebook.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w]*\/)?(?:profile.php\?id=(?=\d.*))?([\w]*)?/,
  tw: /^@(\w){1,15}$/,
  vk: /^(http:\/\/|https:\/\/)?(www.)?(vk\.com|vkontakte\.ru)\/(id\d|[a-zA-Z0-9_.])+$/,
};

const validationSchema = Yup.object({
  nickName: Yup.string().required('Это поле обязательно'),
  firstName: Yup.string().required('Это поле обязательно'),
  lastName: Yup.string().required('Это поле обязательно'),
  email: Yup.string()
    .email()
    .required('Это поле обязательно'),
  phoneNumber: Yup.string()
    .test({
      name: 'phoneNumber',
      params: {},
      exclusive: true,
      message: 'Минимальная длина номера телефона - 11 символов',
      test: value =>
        value === null || value === undefined || parseIncompletePhoneNumber(value).length >= 11,
    })
    .nullable(),
  socialFb: Yup.string()
    .matches(regex.fb, 'Проверьте правильность ввода')
    .nullable(),
  socialTw: Yup.string()
    .matches(regex.tw, 'Проверьте правильность ввода')
    .nullable(),
  socialVk: Yup.string()
    .matches(regex.vk, 'Проверьте правильность ввода')
    .nullable(),
});

const submitForm = (history, { changeLoadingState, changeUserState }) => async values => {
  changeLoadingState(true);

  await queries.updateProfile({ ...values });
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
        {({ setFieldValue }) => (
          <>
            <Form {...formLayoutSchema}>
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

              <FormItem label="ДР" name="birthday">
                <DatePicker name="birthday" locale={locale} />
              </FormItem>
              <FormItem label="Пол" name="gender">
                <Select defaultValue="lucy" name="gender">
                  <Option value="MALE">Муж.</Option>
                  <Option value="FEMALE">Жен.</Option>
                </Select>
              </FormItem>

              <FormItem label="Тел. номер" name="phoneNumber">
                <PhoneInput name="phoneNumber" setValue={setFieldValue} />
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
                <TextArea name="aboutMe" rows={4} />
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
