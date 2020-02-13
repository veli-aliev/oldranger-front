import { Button, Icon, message, Row, Upload } from 'antd';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import queries from '../../../serverQueries';

const UploadButton = styled(Button)`
  @media (max-width: 479px) {
    padding: 5px;
    height: 100%;
  }
`;

const StyledSpan = styled.span`
  @media (max-width: 479px) {
    display: block !important;
  }
`;

const UploadPhoto = props => {
  const { albumId, loadPhotos } = props;
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const uploadProps = {
    accept: '.jpg, .jpeg, .png',
    multiple: true,
    onRemove: file => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: file => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

  const handleUpload =  async () => {
    const formData = new FormData();
    fileList.forEach(file => {
      formData.append('photos', file);
    });
    setUploading(true);

    try {
      await queries.addPhotosInAlbum(albumId, formData);
      setFileList([]);
      setUploading(false);
      message.success('upload successfully.');
      loadPhotos();
    } catch (error) {
      setUploading(false);
      message.error('upload failed.');
    }
  };

  return (
    <>
      <Row type="flex" justify="center">
        <Upload {...uploadProps} disabled={uploading}>
          <UploadButton>
            <Icon type="upload" />
            <StyledSpan>Перетащите сюда или выберите фотографии</StyledSpan>
          </UploadButton>
        </Upload>
      </Row>
      <Row type="flex" justify="center">
        <Button
          type="primary"
          onClick={handleUpload}
          disabled={fileList.length === 0}
          loading={uploading}
          style={{ margin: 16 }}
        >
          {uploading ? 'Загружаем' : 'Добавить Фотографии в альбом'}
        </Button>
      </Row>
    </>
  );
};

UploadPhoto.propTypes = {
  loadPhotos: PropTypes.func.isRequired,
  albumId: PropTypes.number.isRequired,
};

export default UploadPhoto;
