import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PhotoCommentsComponent from './PhotoCommentsComponent';

const ImageSection = styled.div`
  max-width: 600px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 20px;
  max-height: 640px;
`;
const AlbumCommentPapeStyledImage = styled.img`
  width: 100%;
  max-height: 600px;
  object-fit: cover;
`;

const CommentsSection = styled.div`
  max-width: 600px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 0 20px;
`;

class AlbumCommentPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photoTempUlr: 'http://localhost:8888/api/securedPhoto/photoFromAlbum/',
    };
  }

  render() {
    const {
      location: { state },
    } = this.props;
    const { photoID, photoAlbumDto } = state;
    const { photoTempUlr } = this.state;
    return (
      <div>
        <div>
          <Link to="/profile/albums">Альбомы</Link>
          {'>'}
          <Link
            to={{
              pathname: `/profile/albums/${photoID}`,
              state: photoAlbumDto,
            }}
          >
            {' '}
            {`${photoAlbumDto.title}`}{' '}
          </Link>
          {'>'} <span>Комментарии к фотографии</span>
        </div>
        <ImageSection>
          <AlbumCommentPapeStyledImage src={`${photoTempUlr}${photoID}`} />
        </ImageSection>
        <CommentsSection>
          <PhotoCommentsComponent photoId={photoID} commentPage />
        </CommentsSection>
      </div>
    );
  }
}
AlbumCommentPage.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      photoID: PropTypes.number.isRequired,
      photoAlbumDto: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
      original: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default AlbumCommentPage;
