import React, { useState } from 'react';
import { Button, Checkbox, Row } from 'antd';
import { Form, Input } from 'formik-antd';
import { FieldArray, Formik } from 'formik';
import * as Yup from 'yup';

import FormItem from '../formItems/FormItem';
import { StyledInput } from './styled/index';
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
  const filteredValues = {
    ...values,
    tagsId: values.tagsId.filter(tag => tag.trim() !== ''),
  };
  changeLoadingState(true);

  try {
    queries.createArticle(filteredValues);
    setStatus('');
  } catch (error) {
    if (error.response.status === 400) {
      setStatus('Что-то пошло не так');
    }
  }
  changeLoadingState(false);
  return 'ku';
};

const ArticleCreate = () => {
  const [loading, changeLoadingState] = useState(false);

  return (
    <Formik
      initialValues={{
        title: '',
        text: '',
        tagsId: [''],
        isHideToAnon: false,
      }}
      validationSchema={validationSchema}
      onSubmit={articleCreate({ changeLoadingState })}
    >
      {({ status, values, handleChange, errors }) => {
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
                        console.log(errors);
                        return (
                          <FormItem key={`tag-${newIndex}`} label="" name={`tagsId.${index}`}>
                            <StyledInput name={`tagsId.${index}`} />
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
