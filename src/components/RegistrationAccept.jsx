import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Row } from 'antd';
import PropTypes from 'prop-types';
import queries from '../serverQueries';

class RegistrationAccept extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSuccesfull: null,
    };
  }

  async componentDidMount() {
    const { location } = this.props;
    const query = new URLSearchParams(location.search);
    const res = await queries.registrationUserAdd(query.get('key'));
    this.setState({ isSuccesfull: res === 'Ok' });
  }

  render() {
    const { isSuccesfull } = this.state;
    return (
      <>
        <Row type="flex" justify="center">
          {isSuccesfull ? <h1>Поздравляем с успешной регистрацией!</h1> : null}
        </Row>
        <Row type="flex" justify="center">
          <NavLink to="/login">
            <Button>Войти</Button>
          </NavLink>
        </Row>
      </>
    );
  }
}

RegistrationAccept.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
};

export default RegistrationAccept;
