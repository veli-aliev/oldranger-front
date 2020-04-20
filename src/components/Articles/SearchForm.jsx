import React from 'react';
import { withRouter } from 'react-router-dom';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Button, Form as AntForm } from 'antd';
import SimpleInput from '../formItems/SimpleInput';
import { StyledForm } from './styled';

const validationSchema = Yup.object({
  searchRequest: Yup.string()
    .min(3, 'Введите не меннее 3-х символов')
    .required('Поле поиска должно быть заполнено'),
});

const SearchForm = ({ history }) => {
  return (
    <Formik
      initialValues={{
        searchRequest: '',
      }}
      validationSchema={validationSchema}
      onSubmit={({ searchRequest }) => history.push(`/searchArticles/${searchRequest}`)}
    >
      {({ handleSubmit, errors, touched, values, handleChange, handleBlur }) => {
        return (
          <StyledForm onSubmit={handleSubmit}>
            <AntForm.Item
              hasFeedback={!!touched.searchRequest && !!errors.searchRequest}
              validateStatus={touched.searchRequest && errors.searchRequest ? 'error' : 'success'}
              help={touched.searchRequest ? errors.searchRequest : ''}
            >
              <SimpleInput
                placeholder="поиск по статьям"
                name="searchRequest"
                type="text"
                value={values.searchRequest}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Button
                type="primary"
                htmlType="submit"
                icon="search"
                disabled={!!touched.searchRequest && !!errors.searchRequest}
              >
                Искать
              </Button>
            </AntForm.Item>
          </StyledForm>
        );
      }}
    </Formik>
  );
};

SearchForm.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withRouter(SearchForm);
