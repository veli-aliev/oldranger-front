import React from 'react';
import { Row, Button, Icon, message } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Carousel, { Modal, ModalGateway } from 'react-images';
import { Link, withRouter } from 'react-router-dom';
import queries from '../../../serverQueries';
import PhotoCommentsComponent from './Comments/PhotoCommentsComponent';

const CloseModalButton = styled(Button)`
position:absolute;
top:20px;
padding:5px
right:20px;
width:44px;
opacity: 0.7;
z-index: 1;
`;

const DeletePhotoModalButton = styled(Button)`
position:absolute;
top:20px;
right:64px;
padding:5px
width:44px;
opacity: 0.7;
z-index: 1;
`;
const CommentCounter = styled.span`
  margin-left: 0 !important;
  position: relative;
  top: -5px;
  color: red;
  font-size: 10px;
`;
const OpenCommentsModalButton = styled(Button)`
position: absolute;
top:20px;
left: 20px;
padding:5px
width:44px;
opacity: 0.7;
transition: none;
z-index: 1;
`;

const DeletePhotoButton = styled(Button)`
  position: absolute;
  top: 0;
  right: 0;
  display: none;
  padding: 2px 5px;
  opacity: 0.8;
`;

export const ImageWrapper = styled.div`
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
export const StyledImage = styled.img`
  object-fit: cover;
  object-position: top center;
  width: 239px;
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

const CustomViewImage = styled.img`
  height: auto;
  max-height: 100%;
  max-width: 100%;
  flex-shrink: 1;
  margin: 0 auto;
  user-select: none;
  @media (max-width: 1000px) {
    max-width: 100vw;
  }
`;

const CustomViewMainDiv = styled.div`
  line-height: 0;
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  max-height: 500px;
`;

const CustomViewImageWrapper = styled.div`
  max-height: 100%;
  max-width: 70%;
  min-width: 500px;
  min-height: 500px;
  display: flex;
  align-items: center;
  background: lightgrey;
`;
const CustomViewCommentDiv = styled.div`
  width: 300px;
  background: #fff;
  padding: 0 20px;
  @media (max-width: 1000px) {
    display: none;
  }
`;
class Album extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photoTempUlr: 'http://localhost:8888/api/securedPhoto/photoFromAlbum/',
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

  deletePhoto = id => async event => {
    event.stopPropagation();
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

  openAlbumComments = album => async event => {
    event.stopPropagation();
    const {
      history,
      location: { pathname },
    } = this.props;
    const url = `${pathname}/comments/`;
    history.push({
      pathname: url,
      state: album,
    });
  };

  render() {
    const { photos, lightboxIsOpen, selectedIndex, photoTempUlr } = this.state;
    const {
      location: {
        state: { title },
      },
    } = this.props;
    const images = photos.reduce((acc, photo) => {
      return [...acc, { src: `${photoTempUlr}${photo.photoID}` }];
    }, []);

    const CustomHeader = ({ currentIndex, isModal, modalProps: { onClose } }) =>
      isModal ? (
        <div>
          <CloseModalButton onClick={onClose} title="close">
            <Icon type="close" />
          </CloseModalButton>
          <DeletePhotoModalButton
            title="delete"
            onClick={event => {
              this.deletePhoto(photos[currentIndex].photoID)(event);
              onClose();
            }}
          >
            <Icon type="delete" title="delete" />
          </DeletePhotoModalButton>
          {window.matchMedia('(max-width: 1000px)').matches ? (
            <OpenCommentsModalButton
              title="комментарии"
              icon="message"
              onClick={event => {
                this.openAlbumComments(photos[currentIndex])(event);
              }}
            >
              <CommentCounter>300</CommentCounter>
            </OpenCommentsModalButton>
          ) : null}
        </div>
      ) : null;
    const CustomView = props => {
      const { data, formatters, index } = props;
      const innerProps = {
        alt: formatters.getAltText({ data, index }),
        src: data.src,
      };
      return (
        <CustomViewMainDiv>
          <CustomViewImageWrapper>
            <CustomViewImage {...innerProps} />
          </CustomViewImageWrapper>
          <CustomViewCommentDiv>
            <PhotoCommentsComponent photoId={photos[index].photoID} />
          </CustomViewCommentDiv>
        </CustomViewMainDiv>
      );
    };

    if (window.matchMedia('(max-width: 479px)').matches) {
      return (
        <>
          <AlbumNavigation>
            <Link to="/profile/albums">Альбомы</Link>
            <span>{` > ${title}`}</span>
          </AlbumNavigation>
          <AlbumWrapper>
            {photos.length > 0 ? (
              <>
                {photos.map((photo, index) => (
                  <ImageWrapper onClick={() => this.toggleLightbox(index)} key={photo.photoID}>
                    <StyledImage
                      title={photo.description}
                      alt="userPhoto"
                      src={`${photoTempUlr}${photo.photoID}`}
                    />
                    <DeletePhotoButton
                      type="default"
                      title="Удалить Фотографию"
                      onClick={this.deletePhoto(photo.photoID)}
                    >
                      <Icon type="delete" style={{ color: 'red' }} />
                    </DeletePhotoButton>
                  </ImageWrapper>
                ))}
                <ModalGateway>
                  {lightboxIsOpen ? (
                    <Modal onClose={this.toggleLightbox}>
                      <Carousel
                        views={images}
                        currentIndex={selectedIndex}
                        components={{ Header: CustomHeader }}
                      />
                    </Modal>
                  ) : null}
                </ModalGateway>
              </>
            ) : (
              <StyledRow type="flex" justify="center">
                <h4>Альбом пуст</h4>
                <Button>Добавить фотографии</Button>
              </StyledRow>
            )}
          </AlbumWrapper>
        </>
      );
    }

    const PhotoItem = ({ value, photoNum }) => (
      <ImageWrapper onClick={() => this.toggleLightbox(photoNum)}>
        <StyledImage
          title={value.description}
          alt="userPhoto"
          src={`${photoTempUlr}${value.photoID}`}
        />
        <DeletePhotoButton
          type="default"
          title="Удалить Фотографию"
          onClick={this.deletePhoto(value.id)}
        >
          <Icon type="delete" style={{ color: 'red' }} />
        </DeletePhotoButton>
      </ImageWrapper>
    );

    const PhotoList = ({ items }) => (
      <AlbumWrapper>
        {items.map((photo, index) => (
          <PhotoItem key={photo.photoID} index={index} value={photo} photoNum={index} />
        ))}
      </AlbumWrapper>
    );
    return (
      <>
        <AlbumNavigation>
          <Link to="/profile/albums">Альбомы</Link>
          <span>{` > ${title}`}</span>
        </AlbumNavigation>
        {photos.length > 0 ? (
          <>
            <PhotoList items={photos} />
            <ModalGateway>
              {lightboxIsOpen ? (
                <Modal onClose={this.toggleLightbox}>
                  <Carousel
                    views={images}
                    currentIndex={selectedIndex}
                    components={{ Header: CustomHeader, View: CustomView }}
                  />
                </Modal>
              ) : null}
            </ModalGateway>
          </>
        ) : (
          <StyledRow type="flex" justify="center">
            <h4>Альбом пуст</h4>
          </StyledRow>
        )}
        <Button>Добавить фотографии</Button>
      </>
    );
  }
}

Album.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    state: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      fileList: PropTypes.shape({
        indexOf: PropTypes.func.isRequired,
        slice: PropTypes.func.isRequired,
      }),
    }),
  }).isRequired,
};

export default withRouter(Album);
