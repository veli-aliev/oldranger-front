import React, { useState } from 'react';
import { Button, Checkbox, Row } from 'antd';
import { Form, Input } from 'formik-antd';
import { FieldArray, Formik } from 'formik';
import * as Yup from 'yup';

import { useHistory } from 'react-router-dom';
import FormItem from '../formItems/FormItem';
import { StyledInput, Row as StyledRow } from './styled/index';
import queries from '../../serverQueries/index';

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
  title: Yup.string().required('Это поле обязательно'),
  text: Yup.string().required('Это поле обязательно'),
  tagsId: Yup.array(Yup.number().required('Это поле обязательно')).min(1, 'Минимум 1 тэг'),
});

const articleCreate = ({ changeLoadingState }) => async (values, { setStatus }) => {
  changeLoadingState(true);
  setStatus('');
  const res = await queries.createArticle(values);
  if (res.status === 204) {
    setStatus('Нет тэга с таким id');
  }
  if (res.status === 400) {
    setStatus('Что-то пошло не так');
  }
  if (res.status === 200) {
    changeLoadingState(false);
    return true;
  }

  changeLoadingState(false);
  return false;
};

const ArticleCreate = () => {
  const [loading, changeLoadingState] = useState(false);
  const history = useHistory();
  const serverRequest = () => {
    const res = articleCreate({ changeLoadingState });
    if (res) {
      history.push('/articles');
    }
  };

  return (
    <Formik
      initialValues={{
        title: '',
        text: '',
        tagsId: [''],
        isHideToAnon: false,
      }}
      validationSchema={validationSchema}
      onSubmit={serverRequest}
    >
      {({ status, values, handleChange }) => {
        return (
          <>
            {status && (
              <Row type="flex" justify="center">
                <h3>{status}</h3>
              </Row>
            )}
            <Form {...formLayoutSchema}>
              <FormItem label="Заголовок" name="title">
                <Input name="title" />
              </FormItem>
              <FormItem label="Текст" name="text">
                <Input.TextArea name="text" />
              </FormItem>
              <FieldArray
                name="tagsId"
                render={arrayHelpers => (
                  <>
                    <Row type="flex" justify="center">
                      {values.tagsId.map((tag, index) => {
                        const newIndex = index;
                        return (
                          <FormItem key={`tag-${newIndex}`} name={`tagsId.${index}`}>
                            <>
                              <StyledRow>
                                <StyledInput name={`tagsId.${index}`} />
                                {values.tagsId.length > 1 ? (
                                  <Button
                                    type="button"
                                    icon="delete"
                                    onClick={() => arrayHelpers.remove(index)}
                                  />
                                ) : null}
                              </StyledRow>
                            </>
                          </FormItem>
                        );
                      })}
                    </Row>
                    <Row type="flex" justify="center">
                      <Button type="button" onClick={() => arrayHelpers.push('')}>
                        Добавить тэг
                      </Button>
                    </Row>
                  </>
                )}
              />
              <FormItem label="Скрыть для анонимов" name="isHideToAnon">
                <Checkbox
                  name="isHideToAnon"
                  onChange={handleChange}
                  checked={values.isHideToAnon}
                />
              </FormItem>

              <Row type="flex" justify="center">
                <Button type="primary" htmlType="submit" loading={loading}>
                  Создать статью
                </Button>
              </Row>
            </Form>
          </>
        );
      }}
    </Formik>
  );
};

export default ArticleCreate;
