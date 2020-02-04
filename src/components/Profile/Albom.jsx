import React from 'react';
import { Row, Button, Upload, Icon, message } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Carousel, { Modal, ModalGateway } from 'react-images';
import queries from '../../serverQueries';

const DeletePhotoButton = styled(Button)`
  position: absolute;
  top: 0;
  right: 0;
  display: none;
`;

const ImageWrapper = styled.div`
  display: inline-block;
  position: relative;
  margin-top: 15px;
  width: 24%;
  margin: 0.5%;
  .Albom-photo {
    width: 100%;
  }
  &:hover {
    .deletePhotoButton {
      display: block;
    }
  }
`;

const StyledImage = styled.img`
  width: 100%;
  height: 150px;
`;

const AlbomWrapper = styled.div`
  display: flex;
  flex-direction: columns;
  flex-wrap: wrap;
  margin-bottom: 50px;
`;

const StyledRow = styled(Row)`
  margin-bottom: 50px;
  margin-top: 50px;
`;

class Albom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photoTempUlr: 'http://localhost:8888/img/chat/',
      photos: [],
      fileList: [],
      uploading: false,
      selectedIndex: 0,
      lightboxIsOpen: false,
    };
  }

  componentDidMount() {
    this.LoadPhotos();
  }

  toggleLightbox = selectedIndex => {
    this.setState(state => ({
      lightboxIsOpen: !state.lightboxIsOpen,
      selectedIndex,
    }));
  };

  LoadPhotos = async () => {
    const {
      location: { state },
    } = this.props;
    const albomId = state.id;
    try {
      const photos = await queries.GetPhotosFromAlbom(albomId);
      this.setState({ photos });
    } catch (error) {
      /* eslint-disable-next-line no-console */
      console.log(error);
    }
  };

  DeletePhoto = id => async () => {
    const { photos } = this.state;
    try {
      await queries.DeletePhotoFromAlbom(id);
      const newPhotos = photos.reduce((acc, item) => {
        if (item.id !== id) {
          acc.push(item);
        }
        return [...acc];
      }, []);
      this.setState({ photos: newPhotos });
    } catch (error) {
      /* eslint-disable-next-line no-console */
      console.log(error);
    }
  };

  handleUpload = async () => {
    const { fileList } = this.state;
    const {
      location: { state },
    } = this.props;
    const albomId = state.id;
    const formData = new FormData();
    fileList.forEach(file => {
      formData.append('photos', file);
    });
    this.setState({
      uploading: true,
    });

    try {
      await queries.AddPhotosInAlbom(albomId, formData);
      this.setState({
        fileList: [],
        uploading: false,
      });
      message.success('upload successfully.');
      this.LoadPhotos();
    } catch (error) {
      this.setState({
        uploading: false,
      });
      message.error('upload failed.');
    }
  };

  render() {
    const { photos, uploading, fileList, lightboxIsOpen, selectedIndex, photoTempUlr } = this.state;
    const images = photos.reduce((acc, photo) => {
      return [...acc, { src: `${photoTempUlr}${photo.original}` }];
    }, []);
    const uploadProps = {
      accept: '.jpg, .jpeg, .png',
      multiple: true,
      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: file => {
        this.setState(state => ({
          fileList: [...state.fileList, file],
        }));
        return false;
      },
      fileList,
    };

    if (photos.length === 0) {
      return (
        // если альбомов нет - кнопка создать новый альбом.
        <>
          <StyledRow type="flex" justify="center">
            <h4>Альбом пуст</h4>
          </StyledRow>

          <Row type="flex" justify="center">
            <Upload {...uploadProps}>
              <Button>
                <Icon type="upload" /> Перетащите сюда или выберите фотографии
              </Button>
            </Upload>
          </Row>
          <Row type="flex" justify="center">
            <Button
              type="primary"
              onClick={this.handleUpload}
              disabled={fileList.length === 0}
              loading={uploading}
              style={{ marginTop: 16 }}
            >
              {uploading ? 'Загружаем' : 'Добавить Фотографии в альбом'}
            </Button>
          </Row>
        </>
      );
    }
    return (
      <>
        <AlbomWrapper>
          {photos.map((photo, j) => (
            <ImageWrapper key={photo.id}>
              <StyledImage
                onClick={() => this.toggleLightbox(j)}
                title={photo.title}
                alt="userPhoto"
                src={`${photoTempUlr}${photo.original}`}
                className="Albom-photo"
              />
              <DeletePhotoButton
                type="default"
                className="deletePhotoButton"
                title="Удалить Фотографию"
                onClick={this.DeletePhoto(photo.id)}
              >
                <Icon type="close" style={{ color: 'red' }} />
              </DeletePhotoButton>
            </ImageWrapper>
          ))}
          <ModalGateway>
            {lightboxIsOpen ? (
              <Modal onClose={this.toggleLightbox}>
                <Carousel views={images} currentIndex={selectedIndex} />
              </Modal>
            ) : null}
          </ModalGateway>
        </AlbomWrapper>
        <Row type="flex" justify="center">
          <Upload {...uploadProps}>
            <Button>
              <Icon type="upload" /> Перетащите сюда или выберите фотографии
            </Button>
          </Upload>
        </Row>
        <Row type="flex" justify="center">
          <Button
            type="primary"
            onClick={this.handleUpload}
            disabled={fileList.length === 0}
            loading={uploading}
            style={{ marginTop: 16 }}
          >
            {uploading ? 'Загружаем' : 'Добавить Фотографии в альбом'}
          </Button>
        </Row>
      </>
    );
  }
}

Albom.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  }).isRequired,
};

export default Albom;
