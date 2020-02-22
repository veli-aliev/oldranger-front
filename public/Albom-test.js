import React from 'react';
import { Row, Button, Icon, message } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Carousel, { Modal, ModalGateway } from 'react-images';
import { Link, withRouter } from 'react-router-dom';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import queries from '../../../serverQueries';
import UploadPhoto from './UploadPhoto';

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
  max-height: 100vw;
  max-width: 70%;
  flex-shrink: 1;
  user-select: none;
  @media (max-width: 1000px) {
    max-width: 100vw;
  }
`;

const CustomViewMainDiv = styled.div`
  line-height: 0;
  position: relative;
  text-align: center;
  box-sizing: border-box;
  padding-top: 50px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
`;
const CustomViewCommentDiv = styled.div`
  width: 300px;
  background: red;
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
      //const photos = await queries.getPhotosFromAlbum(albumId);
      this.setState({ photos: [ {
        "id" : 1,
        "original" : "Admin\\photo_albums\\10\\76a48a95-23dc-4822-b67f-2fc4d67bf7456.jpg\\76a48a95-23dc-4822-b67f-2fc4d67bf7456.jpg",
        "small" : "Admin\\photo_albums\\10\\76a48a95-23dc-4822-b67f-2fc4d67bf7456.jpg\\small_76a48a95-23dc-4822-b67f-2fc4d67bf7456.jpg",
        "description" : null,
        "positionPhoto" : 1,
        "uploadPhotoDate" : "22 февраля 10:14",
        "album" : {
          "id" : 10,
          "title" : "альбом1",
          "writers" : [ {
            "id" : 1,
            "firstName" : "Admin",
            "lastName" : "Admin",
            "email" : "admin@javamentor.com",
            "nickName" : "Admin",
            "regDate" : "2019-10-31T21:33:35",
            "invite" : null,
            "role" : {
              "id" : 1,
              "role" : "ROLE_ADMIN",
              "authority" : "ROLE_ADMIN",
              "hibernateLazyInitializer" : { }
            },
            "avatar" : {
              "id" : 1,
              "original" : "default.png",
              "medium" : "default.png",
              "small" : "default-sm.png"
            },
            "enabled" : true,
            "username" : "Admin",
            "authorities" : [ {
              "id" : 1,
              "role" : "ROLE_ADMIN",
              "authority" : "ROLE_ADMIN",
              "hibernateLazyInitializer" : { }
            } ],
            "accountNonLocked" : true,
            "credentialsNonExpired" : true,
            "accountNonExpired" : true
          } ],
          "viewers" : [ ],
          "allowView" : true,
          "media" : {
            "id" : 1,
            "user" : {
              "id" : 1,
              "firstName" : "Admin",
              "lastName" : "Admin",
              "email" : "admin@javamentor.com",
              "nickName" : "Admin",
              "regDate" : "2019-10-31T21:33:35",
              "invite" : null,
              "role" : {
                "id" : 1,
                "role" : "ROLE_ADMIN",
                "authority" : "ROLE_ADMIN",
                "hibernateLazyInitializer" : { }
              },
              "avatar" : {
                "id" : 1,
                "original" : "default.png",
                "medium" : "default.png",
                "small" : "default-sm.png"
              },
              "enabled" : true,
              "username" : "Admin",
              "authorities" : [ {
                "id" : 1,
                "role" : "ROLE_ADMIN",
                "authority" : "ROLE_ADMIN",
                "hibernateLazyInitializer" : { }
              } ],
              "accountNonLocked" : true,
              "credentialsNonExpired" : true,
              "accountNonExpired" : true
            },
            "hibernateLazyInitializer" : { }
          },
          "thumbImage" : null
        },
        "commentCount" : null
      }, {
        "id" : 2,
        "original" : "Admin\\photo_albums\\10\\ef979e38-51b1-43ae-8983-0ae368767a908.jpg\\ef979e38-51b1-43ae-8983-0ae368767a908.jpg",
        "small" : "Admin\\photo_albums\\10\\ef979e38-51b1-43ae-8983-0ae368767a908.jpg\\small_ef979e38-51b1-43ae-8983-0ae368767a908.jpg",
        "description" : null,
        "positionPhoto" : 2,
        "uploadPhotoDate" : "22 февраля 10:14",
        "album" : 10,
        "commentCount" : null
      }, {
        "id" : 3,
        "original" : "Admin\\photo_albums\\10\\cb47ad1f-0a81-42de-81a9-49fcdf07f4558uaU0J3j8UY.jpg\\cb47ad1f-0a81-42de-81a9-49fcdf07f4558uaU0J3j8UY.jpg",
        "small" : "Admin\\photo_albums\\10\\cb47ad1f-0a81-42de-81a9-49fcdf07f4558uaU0J3j8UY.jpg\\small_cb47ad1f-0a81-42de-81a9-49fcdf07f4558uaU0J3j8UY.jpg",
        "description" : null,
        "positionPhoto" : 3,
        "uploadPhotoDate" : "22 февраля 10:14",
        "album" : 10,
        "commentCount" : null
      }, {
        "id" : 4,
        "original" : "Admin\\photo_albums\\10\\cb065d3e-3f7d-4a10-bc89-b90139bbc96e9.jpg\\cb065d3e-3f7d-4a10-bc89-b90139bbc96e9.jpg",
        "small" : "Admin\\photo_albums\\10\\cb065d3e-3f7d-4a10-bc89-b90139bbc96e9.jpg\\small_cb065d3e-3f7d-4a10-bc89-b90139bbc96e9.jpg",
        "description" : null,
        "positionPhoto" : 4,
        "uploadPhotoDate" : "22 февраля 10:14",
        "album" : 10,
        "commentCount" : null
      } ] });
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

  onSortEnd = ({ oldIndex, newIndex }) => {
    const { photos } = this.state;
    this.setState({
      photos: arrayMove(photos, oldIndex, newIndex),
    });
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
        state: { id, title },
      },
    } = this.props;
    const images = photos.reduce((acc, photo) => {
      return [...acc, { src: `${photoTempUlr}${photo.id}` }];
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
              this.deletePhoto(photos[currentIndex].id)(event);
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
          <CustomViewImage {...innerProps} />
          <CustomViewCommentDiv>hello its comments part</CustomViewCommentDiv>
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
                  <ImageWrapper onClick={() => this.toggleLightbox(index)} key={photo.id}>
                    <StyledImage
                      title={photo.title}
                      alt="userPhoto"
                      src={`${photoTempUlr}${photo.id}`}
                    />
                    <DeletePhotoButton
                      type="default"
                      title="Удалить Фотографию"
                      onClick={this.deletePhoto(photo.id)}
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
              </StyledRow>
            )}
          </AlbumWrapper>
          <UploadPhoto albumId={id} loadPhotos={this.loadPhotos} />
        </>
      );
    }

    const SortableItem = SortableElement(({ value, photoNum }) => (
      <ImageWrapper onClick={() => this.toggleLightbox(photoNum)}>
        <StyledImage title={value.title} alt="userPhoto" src={`${`/image/`}${value.id}.jpg`} />
        <DeletePhotoButton
          type="default"
          title="Удалить Фотографию"
          onClick={this.deletePhoto(value.id)}
        >
          <Icon type="delete" style={{ color: 'red' }} />
        </DeletePhotoButton>
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
          <span>{` > ${title}`}</span>
        </AlbumNavigation>
        {photos.length > 0 ? (
          <>
            <SortableList axis="xy" items={photos} onSortEnd={this.onSortEnd} distance={1} />
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
        <UploadPhoto albumId={id} loadPhotos={this.loadPhotos} />
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
