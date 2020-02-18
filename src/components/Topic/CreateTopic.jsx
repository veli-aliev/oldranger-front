/* eslint react/prop-types: 0 */
import React from 'react';
import * as Yup from 'yup';
import styled from 'styled-components';
import { Button, Input, Select, Spin } from 'antd';
import { withFormik, Field, Form } from 'formik';
import { Link } from 'react-router-dom';
import queries from '../../serverQueries';

const StyledForm = styled(Form)`
  margin: 0 auto;
  width: 500px;
  text-align: center;
`;

const StyledField = styled.div`
  margin: 10px;
`;

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Минимальная длина 3 символа')
    .required('Заголовок обязателен для заполнения'),
  startMessage: Yup.string()
    .min(4, 'Минимальная длина 4 символа')
    .required('Краткое описание обязательно для заполнения'),
});

class CreateTopic extends React.Component {
  constructor(props) {
    super(props);
    this.state = { children: [], subsection: '' };
  }

  componentDidMount = async () => {
    const response = await queries.getAllSections();
    const sections = response.map(item => item.section.name);
    const data = {};
    response.forEach(item => {
      data[item.section.name] = item.subsections;
    });

    const subsectionsData = {};
    Object.values(data).forEach(item => {
      item.forEach(subsection => {
        subsectionsData[subsection.name] = subsection;
      });
    });
    this.sections = sections;
    this.data = data;
    this.subsectionsData = subsectionsData;
    this.setState({
      children: data[sections[0]],
      subsection: data[sections[0]][0].name,
    });
  };

  handleSectionChange = value => {
    this.setState({
      children: this.data[value],
      subsection: this.data[value][0].name,
    });
  };

  handleSubsectionChange = value => {
    this.setState({
      subsection: value,
    });
  };

  handleSubmit = () => {
    const { values, setValues } = this.props;
    const { subsection } = this.state;
    setValues({
      ...values,
      subsection,
      subsectionsData: this.subsectionsData,
    });
  };

  render() {
    const { children, subsection } = this.state;
    const { errors, touched, isSubmitting } = this.props;
    return (
      <StyledForm>
        {children.length !== 0 ? (
          <>
            <StyledField>
              <Field name="name">
                {({ field }) => <Input {...field} placeholder="Заголовок" type="text" />}
              </Field>
              {touched.name && errors.name && <span className="error">{errors.name}</span>}
            </StyledField>
            <StyledField>
              <Field name="startMessage">
                {({ field }) => (
                  <Input.TextArea {...field} rows="2" placeholder="Сообщение" type="text" />
                )}
              </Field>
              {touched.startMessage && errors.startMessage && (
                <span className="error">{errors.startMessage}</span>
              )}
            </StyledField>
            <StyledField>
              {this.data && (
                <>
                  <Select defaultValue={this.sections[0]} onChange={this.handleSectionChange}>
                    {this.sections.map(item => (
                      <Select.Option key={item}>{item}</Select.Option>
                    ))}
                  </Select>
                  <Select value={subsection} onChange={this.handleSubsectionChange}>
                    {children.map(subs => (
                      <Select.Option key={subs.name}>{subs.name}</Select.Option>
                    ))}
                  </Select>
                </>
              )}
            </StyledField>
            <Button
              htmlType="submit"
              type="primary"
              disabled={isSubmitting}
              onClick={this.handleSubmit}
            >
              Создать
            </Button>
            <Button className="home-button">
              <Link to="/">На главную</Link>
            </Button>
          </>
        ) : (
          <Spin />
        )}
      </StyledForm>
    );
  }
}

const formikCreateTopic = withFormik({
  mapPropsToValues({ name, startMessage }) {
    return {
      name: name || '',
      startMessage: startMessage || '',
    };
  },
  validationSchema,
  handleSubmit: async (values, { setSubmitting, resetForm, props }) => {
    const { history } = props;
    const { name, startMessage, subsection, subsectionsData } = values;
    const formData = new FormData();
    formData.append('name', name);
    formData.append('startMessage', startMessage);
    formData.append('subsection', subsectionsData[subsection].id);
    const response = await queries.createNewTopic(formData);
    if (response.status === 200) {
      setSubmitting(false);
      resetForm();
      history.push(`/topic/${response.data.id}`);
    }
  },
})(CreateTopic);

export default formikCreateTopic;
