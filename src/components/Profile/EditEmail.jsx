import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Input, Form, message } from 'antd';
import { Field, Formik } from 'formik';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as Yup from 'yup';
import queries from '../../serverQueries';

const Wrapper = styled.div`
  padding: 30px;
  width: 500px;
  margin: 0 auto;
`;

const StyledButton = styled(Button)`
  margin-top: 10px;
  margin-bottom: 5px;
  width: 100px;
`;

const StyledInput = styled(Input)`
  width: 300px;
  display: flex;
  align-self: flex-start;
`;

const StyledInputPassword = styled(Input.Password)`
  width: 300px;
  display: flex;
  align-self: center;
`;

const StyledForm = styled(Form)`
  display: flex;
  height: 220px;
  max-width: 400px;
  flex-flow: column;
  align-items: center;
  justify-content: space-around;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  margin-top: 10px;
`;

const Symbol = styled.span`
  font-size: 16px;
  color: red;
  margin-right: auto;
`;

const Label = styled.label`
  display: inline-flex;
  width: 400px;
  vertical-align: baseline;
  justify-content: space-between;
`;

const validationSchema = Yup.object().shape({
  newEmail: Yup.string()
    .typeError('Неверный формат введенных данных')
    .email('Некорректный email адрес')
    .required('Поле не заполнено'),
  password: Yup.string().required('Поле не заполнено'),
});

const EditEmail = () => {
  return (
    <Formik
      initialValues={{
        newEmail: '',
        password: '',
      }}
      validationSchema={validationSchema}
      onSubmit={async ({ newEmail, password }) => {
        try {
          await queries.editEmailProfile(newEmail, password);
          // this.setState({});
          message.success('Email успешно изменен.');
          // history.push('/profile');
        } catch (err) {
          // this.setState({});
          message.error('Что-то не так, не удалось изменить email.');
        }
      }}
    >
      {({ values, errors, touched, handleChange, handleSubmit, isSubmitting }) => (
        <Wrapper>
          <StyledForm onSubmit={handleSubmit}>
            <Label>
              New Email<Symbol>*</Symbol>
              <Form.Item
                validateStatus={touched.newEmail && errors.newEmail ? 'error' : 'validate'}
                help={touched.newEmail && errors.newEmail ? errors.newEmail : null}
              >
                <Field
                  onPressEnter={handleSubmit}
                  onChange={event => {
                    handleChange(event);
                  }}
                  value={values.newEmail}
                  name="newEmail"
                  id="newEmail"
                  type="email"
                  component={StyledInput}
                />
              </Form.Item>
            </Label>
            <Label>
              Password<Symbol>*</Symbol>
              <Form.Item
                validateStatus={touched.password && errors.password ? 'error' : 'validate'}
                help={touched.password && errors.password ? errors.password : null}
              >
                <Field
                  onPressEnter={handleSubmit}
                  onChange={event => {
                    handleChange(event);
                  }}
                  value={values.password}
                  name="password"
                  visibilityToggle
                  id="password"
                  type="password"
                  component={StyledInputPassword}
                />
              </Form.Item>
            </Label>
            <StyledButton type="primary" onClick={handleSubmit} loading={isSubmitting}>
              Отправить
            </StyledButton>
            {/* {emailOrPassword ? ( */}
            {/*	<div */}
            {/*		style={{ color: "red" }} */}
            {/*	>{`Email or password ${emailOrPassword}`}</div> */}
            {/* ) : null} */}
            <StyledLink to="/profile">Вернуться в профиль</StyledLink>
          </StyledForm>
        </Wrapper>
      )}
    </Formik>
  );
};

EditEmail.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
};

export default withRouter(EditEmail);
