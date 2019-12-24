import React from 'react';
import { Row, Button, Divider } from 'antd';
import { Form, Input } from 'formik-antd';
import { Formik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';

import queries from '../../serverQueries';

import FormItem from '../formItems/FormItem';

const StyledWrapper = styled.div`
  margin-bottom: 20px;
  .ant-input {
    max-width: 400px;
  }
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
    offset: 10,
  },
};

const validationSchema = Yup.object({
  Email: Yup.string()
    .email('Некорректный email адрес')
    .required('Это поле обязательно'),
});

class Invite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      token: '',
    };
  }

  async componentDidMount() {
    const token = await queries.getInviteCode();
    this.setState({ token });
  }

  submitForm = async values => {
    this.setState({ loading: true });
    await queries.sendInviteCode(values);
    this.setState({ loading: false });
  };

  render() {
    const { loading, token } = this.state;
    return (
      <Formik
        initialValues={{
          Email: '',
        }}
        validationSchema={validationSchema}
        onSubmit={this.submitForm}
      >
        {({ handleSubmit }) => (
          <>
            <StyledWrapper>
              <Row type="flex" justify="center">
                <h4>Ссылка для регистрации</h4>
              </Row>
              <Row type="flex" justify="center">
                <Input value={`http://localhost:3000/registration?token=${token}`} />
              </Row>
            </StyledWrapper>

            <Divider />

            <Form onSubmit={handleSubmit} {...formLayoutSchema}>
              <FormItem label="Email" name="Email">
                <Input name="Email" />
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
    );
  }
}

export default Invite;
