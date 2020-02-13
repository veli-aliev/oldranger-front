import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const EditAlbum = props => {
  const {
    location: { state },
  } = props;
  const { title } = state;
  const { id } = state;
  return (
    <div>
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
      EditAlbum
    </div>
  );
};
EditAlbum.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default EditAlbum;
