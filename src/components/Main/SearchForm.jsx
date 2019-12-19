import React from 'react';
import { withRouter } from 'react-router-dom';
import { Formik, Field as FormikField } from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Button, Form as AntForm, Input, Select } from 'antd';
import { StyledForm, StyledSelect } from './styled/StyledSearchForm';
import SimpleInput from '../formItems/SimpleInput';

const InputGroup = Input.Group;
const { Option } = Select;

const validationSchema = Yup.object({
  searchRequest: Yup.string().min(3, 'Введите не меннее 3-х символов'),
});

const SearchForm = ({ history }) => {
  return (
    <Formik
      initialValues={{
        searchRequest: '',
        searchBy: 'searchTopics',
      }}
      validationSchema={validationSchema}
      onSubmit={({ searchBy, searchRequest }) => history.push(`/${searchBy}/${searchRequest}`)}
    >
      {({ handleSubmit, errors, touched, values, setFieldValue, setFieldTouched }) => {
        return (
          <StyledForm onSubmit={handleSubmit}>
            <AntForm.Item
              hasFeedback={!!touched.searchRequest && !!errors.searchRequest}
              validateStatus={touched.searchRequest && errors.searchRequest ? 'error' : 'success'}
              help={touched.searchRequest ? errors.searchRequest : ''}
            >
              <InputGroup compact>
                <SimpleInput placeholder="Поиск по Форуму" name="searchRequest" type="text" />
                <FormikField name="searchBy">
                  {({ field }) => (
                    <StyledSelect
                      {...field}
                      onChange={value => setFieldValue('searchBy', value)}
                      onBlur={() => setFieldTouched('searchBy', true)}
                      value={values.searchBy}
                    >
                      <Option key={1} value="searchTopics">
                        По темам
                      </Option>
                      <Option key={2} value="searchComments">
                        По сообщениям
                      </Option>
                    </StyledSelect>
                  )}
                </FormikField>
                <Button type="primary" htmlType="submit" icon="search">
                  Искать
                </Button>
              </InputGroup>
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
