import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { message, Button, Input, Modal, Row } from 'antd';
import styled from 'styled-components';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import queries from '../../../serverQueries';
import { StyledImage } from './Album';
import UploadPhoto from './UploadPhoto';

const CustomUploadPhoto = styled(UploadPhoto)`
  margin-top: 20px;
`;
const EditSection = styled.div`
  justify-content: space-around;
  margin-top: 50px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  @media (max-width: 830px) {
    flex-wrap: wrap;
  }
`;
const ChooseNewCoverSectionImage = styled(StyledImage)`
  width: 50%;
`;
const EditMenu = styled.div`
  width: 239px;
  @media (max-width: 830px) {
    margin: 0 auto;
  }
`;
const SaveChanges = styled(Button)`
  margin-top: 15px;
  margin-bottom: 15px;
`;
const EditSectionAlbumTitle = styled.div`
  margin-top: 20px;
`;
const GaleryImages = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;
const EditAlbumImageWrapper = styled.div`
  position: relative;
  @media (max-width: 500px) {
    padding-top: 5px;
  }
`;
const Galery = styled.div`
  display: flex;
  flex-direction: column;
`;
const GaleryTitle = styled.div`
  align-self: center;
`;
const ChoosePhotoButton = styled(Button)`
  position: absolute;
  top: 0px;
  left: 0px;
  @media (max-width: 500px) {
    top: 5px;
  }
`;

class EditAlbum extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      photosToDelete: [],
      photoTempUlr: 'http://localhost:8888/api/securedPhoto/photoFromAlbum/',
      visible: false,
      albumCoverUrl: '',
    };
  }

  componentDidMount() {
    this.loadPhotos();
    this.getAlbumCover();
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = photo => () => {
    const { photoTempUlr } = this.state;
    this.setState({
      visible: false,
      albumCoverUrl: `${photoTempUlr}${photo.photoID}`,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    const { photos } = this.state;
    this.setState({
      photos: arrayMove(photos, oldIndex, newIndex),
    });
  };

  getAlbumCover = () => {
    const { photoTempUlr } = this.state;
    const {
      location: {
        state: { originalThumbImage },
      },
    } = this.props;
    const url =
      originalThumbImage === 'thumb_image_placeholder'
        ? `/defaultAlbumTheme.jpg`
        : `${photoTempUlr}${originalThumbImage}`;
    this.setState({
      albumCoverUrl: url,
    });
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

  addPhotoToDeleteArray = photoId => event => {
    event.stopPropagation();
    const { photosToDelete } = this.state;
    if (photosToDelete.indexOf(photoId) !== -1) {
      photosToDelete.splice(photosToDelete.indexOf(photoId), 1);
      this.setState({
        photosToDelete: [...photosToDelete],
      });
    } else {
      photosToDelete.push(photoId);
      this.setState({
        photosToDelete: [...photosToDelete],
      });
    }
  };

  openPhotoComents = photo => event => {
    event.stopPropagation();
    const { history } = this.props;
    const url = `/profile/albums/${photo.id}/comments/`;
    history.push({
      pathname: url,
      state: photo,
    });
  };

  render() {
    const {
      location: { state },
    } = this.props;
    const { title, id } = state;
    const { photoTempUlr, photos, photosToDelete, albumCoverUrl, visible } = this.state;

    const SortableItem = SortableElement(({ value }) => (
      <EditAlbumImageWrapper
        key={value.photoID}
        onClick={event => this.openPhotoComents(value)(event)}
      >
        <StyledImage src={`${photoTempUlr}${value.photoID}`} />
        <ChoosePhotoButton
          shape="circle"
          icon={photosToDelete.includes(value.photoID) ? 'check' : undefined}
          onClick={event => this.addPhotoToDeleteArray(value.photoID)(event)}
        />
      </EditAlbumImageWrapper>
    ));

    const SortableList = SortableContainer(({ items }) => (
      <GaleryImages>
        {items.map((photo, index) => (
          <SortableItem key={photo.photoID} index={index} value={photo} photoNum={index} />
        ))}
      </GaleryImages>
    ));

    return (
      <div>
        <Modal
          title="Выберите новую абложку альбома"
          visible={visible}
          footer={null}
          onCancel={this.handleCancel}
        >
          {photos.map(photo => (
            <ChooseNewCoverSectionImage
              src={`${photoTempUlr}${photo.photoID}`}
              key={photo.photoID}
              onClick={this.handleOk(photo)}
            />
          ))}
        </Modal>

        <div>
          <Link to="/profile/albums">Альбомы </Link>
          {'>'}
          <Link
            to={{
              pathname: `/profile/albums/${id}`,
              state,
            }}
          >
            {' '}
            {`${title}`}{' '}
          </Link>
          {'>'} <span>Редактировать альбом</span>
        </div>
        <EditSection>
          <EditMenu>
            <div>Обложка альбома</div>
            <StyledImage src={albumCoverUrl} alt="обложка альбома" />
            <Button block onClick={this.showModal}>
              Изменить
            </Button>
            <EditSectionAlbumTitle>Название альбома</EditSectionAlbumTitle>
            <Input defaultValue={title} />
            <SaveChanges block>Сохранить изменения</SaveChanges>
            {photosToDelete.length > 0 ? (
              <Button block type="danger">
                Удалить фотографии
              </Button>
            ) : null}
          </EditMenu>

          <Galery>
            <GaleryTitle>Фотографии альбома</GaleryTitle>
            {photos.length > 0 ? (
              <>
                <SortableList axis="xy" items={photos} onSortEnd={this.onSortEnd} distance={1} />
              </>
            ) : (
              <Row type="flex" justify="center">
                <h4>Альбом пуст</h4>
              </Row>
            )}
            <CustomUploadPhoto albumId={id} loadPhotos={this.loadPhotos} />
          </Galery>
        </EditSection>
      </div>
    );
  }
}
EditAlbum.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      originalThumbImage: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default withRouter(EditAlbum);
