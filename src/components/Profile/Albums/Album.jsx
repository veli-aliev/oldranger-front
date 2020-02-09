import React from 'react';
import { Row, Button, Icon, message } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Carousel, { Modal, ModalGateway } from 'react-images';
import { Link } from 'react-router-dom';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import queries from '../../../serverQueries';
import UploadPhoto from './UploadPhoto';

const DeletePhotoButton = styled(Button)`
  position: absolute;
  top: 0;
  right: 0;
  display: none;
  padding: 2px 5px;
  opacity: 0.8;
`;
const FullScreenPhotoButton = styled(DeletePhotoButton)`
  right: 30px;
`;

const ImageWrapper = styled.div`
  display: inline-block;
  position: relative;
  width: 239px;
  margin: 3px;
  &:hover ${DeletePhotoButton} {
    display: block;
  }
`;
const AlbumNavigation = styled.div`
  margin-left: 5px;
`;
const StyledImage = styled.img`
  width: 100%;
  height: 150px;
`;

const AlbumWrapper = styled.div`
  display: flex;
  flex-direction: columns;
  flex-wrap: wrap;
  margin-bottom: 50px;
  margin-top: 30px;
  @media (max-width: 1000px) {
    justify-content: center;
  }
`;

const StyledRow = styled(Row)`
  margin-bottom: 50px;
  margin-top: 30px;
`;

class Album extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photoTempUlr: 'http://localhost:8888/img/chat/',
      photos: [],
      selectedIndex: 0,
      lightboxIsOpen: false,
    };
  }

  componentDidMount() {
    this.loadPhotos();
  }

  toggleLightbox = selectedIndex => {
    this.setState(state => ({
      lightboxIsOpen: !state.lightboxIsOpen,
      selectedIndex,
    }));
  };

  loadPhotos = async () => {
    const {
      location: { state },
    } = this.props;

    const albumId = state.id;
    try {
      const photos = await queries.getPhotosFromAlbum(albumId);
      this.setState({ photos });
    } catch (error) {
      /* eslint-disable-next-line no-console */
      console.error(error.response);
      message.error('что-то пошло не так');
    }
  };

  deletePhoto = id => async () => {
    const { photos } = this.state;
    try {
      await queries.deletePhotoFromAlbum(id);
      const newPhotos = photos.reduce((acc, item) => {
        if (item.id !== id) {
          acc.push(item);
        }
        return [...acc];
      }, []);
      this.setState({ photos: newPhotos });
    } catch (error) {
      /* eslint-disable-next-line no-console */
      console.error(error.response);
      message.error('что-то пошло не так');
    }
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    const { photos } = this.state;
    this.setState({
      photos: arrayMove(photos, oldIndex, newIndex),
    });
  };

  render() {
    const { photos, lightboxIsOpen, selectedIndex, photoTempUlr } = this.state;
    const {
      location: {
        state: { id },
      },
    } = this.props;
    const images = photos.reduce((acc, photo) => {
      return [...acc, { src: `${photoTempUlr}${photo.original}` }];
    }, []);

    const SortableItem = SortableElement(({ value, photoNum }) => (
      <ImageWrapper>
        <StyledImage title={value.title} alt="userPhoto" src={`${photoTempUlr}${value.original}`} />
        <DeletePhotoButton
          type="default"
          title="Удалить Фотографию"
          onClick={this.deletePhoto(value.id)}
        >
          <Icon type="close" style={{ color: 'red' }} />
        </DeletePhotoButton>

        <FullScreenPhotoButton onClick={() => this.toggleLightbox(photoNum)}>
          <Icon type="fullscreen" />
        </FullScreenPhotoButton>
      </ImageWrapper>
    ));

    const SortableList = SortableContainer(({ items }) => (
      <AlbumWrapper>
        {items.map((photo, index) => (
          <SortableItem key={photo.id} index={index} value={photo} photoNum={index} />
        ))}
      </AlbumWrapper>
    ));
    return (
      <>
        <AlbumNavigation>
          <Link to="/profile/albums">Альбомы</Link>
          <span>{` > ${id}`}</span>
        </AlbumNavigation>
        {photos.length > 0 ? (
          <>
            <SortableList axis="xy" items={photos} onSortEnd={this.onSortEnd} />
            <ModalGateway>
              {lightboxIsOpen ? (
                <Modal onClose={this.toggleLightbox}>
                  <Carousel views={images} currentIndex={selectedIndex} />
                </Modal>
              ) : null}
            </ModalGateway>
          </>
        ) : (
          <StyledRow type="flex" justify="center">
            <h4>Альбом пуст</h4>
          </StyledRow>
        )}
        <UploadPhoto albumId={id} loadPhotos={this.loadPhotos} />
      </>
    );
  }
}

Album.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      id: PropTypes.number.isRequired,
      fileList: PropTypes.shape({
        indexOf: PropTypes.func.isRequired,
        slice: PropTypes.func.isRequired,
      }),
    }),
  }).isRequired,
};

export default Album;
