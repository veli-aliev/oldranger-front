import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { message, Button, Input, Modal } from 'antd';
import styled from 'styled-components';
import queries from '../../../serverQueries';
import { StyledImage } from './Album';

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

  getAlbumCover = () => {
    const { photoTempUlr } = this.state;
    const {
      location: {
        state: { thumbImageId },
      },
    } = this.props;
    const url = thumbImageId ? `${photoTempUlr}${thumbImageId}` : `/defaultAlbumTheme.jpg`;
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

  handleDeletePhotos = async () => {
    const { photosToDelete } = this.state;
    try {
      await Promise.all(photosToDelete.map(id => queries.deletePhotoFromAlbum(id)));
      this.setState(({ photos }) => ({
        photos: photos.filter(({ photoID }) => !photosToDelete.includes(photoID)),
        photosToDelete: [],
      }));
    } catch (error) {
      // message.error('что-то пошло не так');
      await this.loadPhotos();
    }
  };

  addPhotoToDeleteArray(photoId) {
    this.setState(({ photosToDelete }) => {
      const isIncludes = photosToDelete.includes(photoId);
      return {
        photosToDelete: isIncludes
          ? photosToDelete.filter(id => id !== photoId)
          : [...photosToDelete, photoId],
      };
    });
  }

  render() {
    const {
      location: { state },
    } = this.props;
    // TODO ???
    const { title, id } = state;
    const { photoTempUlr, photos, photosToDelete, albumCoverUrl, visible } = this.state;
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
              <Button block type="danger" onClick={this.handleDeletePhotos}>
                Удалить фотографии
              </Button>
            ) : null}
          </EditMenu>

          <Galery>
            <GaleryTitle>Фотографии альбома</GaleryTitle>
            <GaleryImages>
              {photos.map(photo => (
                <EditAlbumImageWrapper key={photo.photoID}>
                  <StyledImage src={`${photoTempUlr}${photo.photoID}`} />
                  <ChoosePhotoButton
                    shape="circle"
                    icon={photosToDelete.includes(photo.photoID) ? 'check' : undefined}
                    onClick={() => this.addPhotoToDeleteArray(photo.photoID)}
                  />
                </EditAlbumImageWrapper>
              ))}
            </GaleryImages>
          </Galery>
        </EditSection>
      </div>
    );
  }
}

EditAlbum.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      thumbImageId: PropTypes.number,
    }),
  }).isRequired,
};

export default EditAlbum;
