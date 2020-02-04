import React from 'react';
import { Row, Button, Icon } from 'antd';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import queries from '../../serverQueries';

const StyledAlbomCard = styled.div`
  width: 300px
  position:relative;
  height: 150px;
  margin: 3px;
  background-size: cover;
  background-image: ${props => `url(${props.background}) `}; 
  .StyledAlbomCard-albomTitle{
    word-break: break-all;
    position: absolute;
    bottom: 0;
    left: 0;
  };
  .StyledAlbomCard-photoCount{
    position: absolute;
    bottom: 0;
    right: 0;
  };
  .Alboms-deletePhotoButton{
    display:none;
    position: absolute;
    top: 0;
    right: 0;
  }
   &:hover {
    .Alboms-deletePhotoButton {
      display: block;
    }
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

  DeleteAlbom = albom => async event => {
    event.stopPropagation();
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
              onClick={this.OpenAlbom(albom)}
              key={albom.id}
              background={
                albom.originalThumbImage ? `${albom.originalThumbImage}` : `/defaultAlbomTheme.jpg`
              }
            >
              <p className="StyledAlbomCard-albomTitle">{albom.title}</p>
              <p className="StyledAlbomCard-photoCount">{albom.photosCounter}</p>
              <Button
                className="Alboms-deletePhotoButton"
                type="default"
                title="Удалить альбом"
                onClick={this.DeleteAlbom(albom)}
              >
                <Icon type="close" style={{ color: 'red' }} />
              </Button>
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
