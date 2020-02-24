import React from 'react';
import { Upload, Icon, Modal } from 'antd';
import PropTypes from 'prop-types';
import { UploadViewOnly } from './styled';
import fileProps from './propTypes/fileProps';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class TopicPhotoList extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      // eslint-disable-next-line no-param-reassign
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  beforeUpload = () => {
    return false;
  };

  render() {
    const { previewVisible, previewImage } = this.state;
    const { canUpload, fileList, handleChangePicturesState, defaultFileList } = this.props;
    const uploadBasicProps = {
      listType: 'picture-card',
      fileList,
      onPreview: this.handlePreview,
      defaultFileList,
    };
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Добавить фото</div>
      </div>
    );
    return (
      <div className="clearfix">
        {canUpload ? (
          <Upload
            {...uploadBasicProps}
            accept=".jpg,.png"
            onChange={handleChangePicturesState}
            beforeUpload={this.beforeUpload}
          >
            {fileList.length >= 2 ? null : uploadButton}
          </Upload>
        ) : (
          <UploadViewOnly {...uploadBasicProps} />
        )}
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

TopicPhotoList.propTypes = {
  canUpload: PropTypes.bool,
  fileList: PropTypes.arrayOf(fileProps).isRequired,
  handleChangePicturesState: PropTypes.func,
  defaultFileList: PropTypes.arrayOf(fileProps),
};

TopicPhotoList.defaultProps = {
  canUpload: false,
  handleChangePicturesState: () => {},
  defaultFileList: null,
};

export default TopicPhotoList;
