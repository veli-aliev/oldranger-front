import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ImageSection = styled.div`
  max-width: 600px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 20px;
`;
const AlbumCommentPapeStyledImage = styled.img`
  width: 100%;
`;

const CommentsSection = styled.div`
  max-width: 600px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 0 20px;
`;
class EditAlbum extends React.Component {
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

    const { id, album } = state;
    const { photoTempUlr } = this.state;
    return (
      <div>
        <div>
          <Link to="/profile/albums">Альбомы </Link>
          {'>'}
          <Link
            to={{
              pathname: `/profile/albums/${id}`,
              state: album,
            }}
          >
            {' '}
            {`${album.title}`}{' '}
          </Link>
          {'>'} <span>Комментарии к фотографии</span>
        </div>
        <ImageSection>
          <AlbumCommentPapeStyledImage src={`${photoTempUlr}${id}`} />
        </ImageSection>
        <CommentsSection>comments</CommentsSection>
      </div>
    );
  }
}
EditAlbum.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      album: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
      original: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default EditAlbum;
