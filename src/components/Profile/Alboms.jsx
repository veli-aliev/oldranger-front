import React from 'react';
import { Row, Button, Card } from 'antd';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import queries from '../../serverQueries';

const StyledButton = styled(Button)`
  width: 100%;
  .deleteButton {
    margin-top: 10px;
  }
`;

const StyledAlbomCard = styled(Card)`
  width: 30%;
  margin: 1%;
`;

const StyledAlbomWrapper = styled.div`
  display: flex;
  flex-direction: columns;
  flex-wrap: wrap;
  align-content: space-between;
  margin-bottom: 30px;
`;

class Alboms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alboms: [],
    };
  }

  componentDidMount() {
    this.LoadAlboms();
  }

  LoadAlboms = async () => {
    const AllAlboms = await queries.GetAlboms();
    const albomsToShow = [];
    AllAlboms.map(albom => albom.allowView && albomsToShow.push(albom));
    this.setState({ alboms: albomsToShow });
  };

  CreateNewAlbom = async () => {
    const { alboms } = this.state;
    // eslint-disable-next-line no-alert
    const title = prompt('Название альбома');
    if (!title) {
      /* eslint-disable-next-line no-alert */
      alert("u need to enter albom's title");
      return;
    }
    try {
      const NewAlbom = await queries.CreateNewAlbom(title);
      this.setState({ alboms: [...alboms, NewAlbom] });
    } catch (error) {
      /* eslint-disable-next-line no-console */
      console.log(error.response);
    }
  };

  DeleteAlbom = albom => async () => {
    const { alboms } = this.state;
    try {
      await queries.DeleteAlbom(albom.id);
      const newAlboms = alboms.reduce((acc, item) => {
        if (item.id !== albom.id) {
          acc.push(item);
        }
        return [...acc];
      }, []);
      this.setState({ alboms: newAlboms });
    } catch (error) {
      /* eslint-disable-next-line no-console */
      console.log(error);
    }
  };

  OpenAlbom = albom => () => {
    const {
      history,
      location: { pathname },
    } = this.props;
    const url = `${pathname}/${albom.id}`;
    history.push({
      pathname: url,
      state: albom,
    });
  };

  render() {
    const { alboms } = this.state;

    if (alboms.length === 0) {
      return (
        <>
          <Row type="flex" justify="center">
            <h4>Пока альбомов нет</h4>
          </Row>

          <Row type="flex" justify="center">
            <Button type="primary" onClick={this.CreateNewAlbom}>
              Создать новый альбом
            </Button>
          </Row>
        </>
      );
    }

    return (
      <>
        <StyledAlbomWrapper>
          {alboms.map(albom => (
            <StyledAlbomCard
              title={albom.title}
              key={albom.id}
              extra={
                <StyledButton type="danger" onClick={this.DeleteAlbom(albom)}>
                  Удалить альбом
                </StyledButton>
              }
            >
              <StyledButton type="primary" onClick={this.OpenAlbom(albom)}>
                Открыть альбом
              </StyledButton>
            </StyledAlbomCard>
          ))}
        </StyledAlbomWrapper>

        <Row type="flex" justify="center">
          <Button type="primary" onClick={this.CreateNewAlbom}>
            Создать новый альбом
          </Button>
        </Row>
      </>
    );
  }
}

Alboms.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(Alboms);
