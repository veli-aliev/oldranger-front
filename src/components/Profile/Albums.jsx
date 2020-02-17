import React from 'react';
import { Row, Button, Icon, message } from 'antd';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import queries from '../../serverQueries';

const DeletePhotoButton = styled(Button)`
  display: none;
  position: absolute;
  top: 0;
  right: 0;
`;

const StyledAlbumCard = styled.div`
  position: relative;
  height: 150px;
  width: 239px;
  margin: 3px;
  background-size: cover;
  background-image: ${props => `url(${props.background}) `};
  &:hover ${DeletePhotoButton} {
    display: block;
  }
`;

const PhotoCounter = styled.span`
  position: absolute;
  bottom: 0;
  right: 0;
`;

const AlbumTitle = styled.span`
  word-break: break-all;
  position: absolute;
  bottom: 0;
  left: 0;
`;

const StyledAlbumWrapper = styled.div`
  display: flex;
  flex-direction: columns;
  flex-wrap: wrap;
  align-content: space-between;
  margin: 30px 0;
  @media (max-width: 1000px) {
    justify-content: center;
  }
`;

class Albums extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: [],
    };
  }

  componentDidMount() {
    this.loadAlbums();
  }

  loadAlbums = async () => {
    const allAlbums = await queries.getAlbums();
    const albumsToShow = [];
    allAlbums.map(album => album.allowView && albumsToShow.push(album));
    this.setState({ albums: albumsToShow });
  };

  createNewAlbum = async () => {
    const { albums } = this.state;
    // eslint-disable-next-line no-alert
    const title = prompt('Название альбома');
    if (!title) {
      /* eslint-disable-next-line no-alert */
      message.error('Необходимо указать название для альбома');
      return;
    }
    try {
      const NewAlbum = await queries.createNewAlbum(title);
      this.setState({ albums: [...albums, NewAlbum] });
    } catch (error) {
      /* eslint-disable-next-line no-console */
      console.error(error.response);
      message.error('что-то пошло не так');
    }
  };

  deleteAlbum = album => async event => {
    event.stopPropagation();
    const { albums } = this.state;
    try {
      await queries.deleteAlbum(album.id);
      const newAlbums = albums.reduce((acc, item) => {
        if (item.id !== album.id) {
          acc.push(item);
        }
        return [...acc];
      }, []);
      this.setState({ albums: newAlbums });
    } catch (error) {
      /* eslint-disable-next-line no-console */
      console.error(error.response);
      message.error('что-то пошло не так');
    }
  };

  openAlbum = album => () => {
    const {
      history,
      location: { pathname },
    } = this.props;
    const url = `${pathname}/${album.id}`;
    history.push({
      pathname: url,
      state: album,
    });
  };

  render() {
    const { albums } = this.state;
    return (
      <>
        {albums.length > 0 ? (
          <StyledAlbumWrapper>
            {albums.map(album => (
              <StyledAlbumCard
                onClick={this.openAlbum(album)}
                key={album.id}
                background={
                  album.originalThumbImage
                    ? `${album.originalThumbImage}`
                    : `/defaultAlbumTheme.jpg`
                }
              >
                <AlbumTitle>{album.title}</AlbumTitle>
                <PhotoCounter>{album.photosCounter}</PhotoCounter>
                <DeletePhotoButton
                  type="default"
                  title="Удалить альбом"
                  onClick={this.deleteAlbum(album)}
                >
                  <Icon type="close" style={{ color: 'red' }} />
                </DeletePhotoButton>
              </StyledAlbumCard>
            ))}
          </StyledAlbumWrapper>
        ) : (
          <Row type="flex" justify="center">
            <h4>Пока альбомов нет</h4>
          </Row>
        )}

        <Row type="flex" justify="center">
          <Button type="primary" onClick={this.createNewAlbum}>
            Создать новый альбом
          </Button>
        </Row>
      </>
    );
  }
}

Albums.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(Albums);
