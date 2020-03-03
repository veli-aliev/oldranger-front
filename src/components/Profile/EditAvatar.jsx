import React from 'react';
import { Button, Upload, Icon, message } from 'antd';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import queries from '../../serverQueries';
import Context from '../Context';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledHeading = styled.h2`
  color: #333;
`;

const StyledText = styled.p`
  margin-bottom: 20px;
`;

const StyledBtnWrapp = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class EditAvatar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
      avatarThumbUrl: null,
      avatarFile: null,
      uploading: false,
    };
  }

  handleUpload = async () => {
    this.setState({ uploading: true });
    const { changeUserState } = this.context;
    const { avatarFile } = this.state;
    const { history } = this.props;
    const formData = new FormData();
    formData.set('file', avatarFile, avatarFile.name);
    try {
      await queries.updateAvatar(formData);
      const userAuth = await queries.getProfileData();
      localStorage.setItem('user', JSON.stringify(userAuth));
      changeUserState(userAuth);
      this.setState({
        fileList: [],
        avatarThumbUrl: null,
        avatarFile: null,
        uploading: false,
      });
      message.success('Фотография успешно загружена.');
      history.push('/profile');
    } catch {
      this.setState({
        uploading: false,
      });
      message.error('Что-то не так, фотография не загружена.');
    }
  };

  delete = () => {
    this.setState({ avatarThumbUrl: null, avatarFile: null });
  };

  render() {
    const { avatarThumbUrl, uploading, avatarFile, fileList } = this.state;
    const img = avatarThumbUrl ? (
      <img src={avatarThumbUrl} alt="avatar" style={{ width: '50%', margin: '20px auto' }} />
    ) : null;
    const resetBtn = (
      <Button
        onClick={this.delete}
        disabled={avatarThumbUrl === null}
        style={{ display: 'inline-block', margin: '20px 5px' }}
      >
        Отменить
      </Button>
    );
    const propsUpload = {
      accept: '.jpg,.png',
      beforeUpload: file => {
        getBase64(file).then(filePrevie => {
          this.setState({ avatarThumbUrl: filePrevie, avatarFile: file });
        });
        return false;
      },
      fileList,
    };

    return (
      <>
        <StyledWrapper>
          <StyledHeading>Загрузка новой фотографии</StyledHeading>
          <StyledText>Вы можете загрузить изображение в формате JPG или PNG.</StyledText>
          {img}
          <Upload {...propsUpload}>
            <Button style={{ display: 'inline-block' }}>
              <Icon type="upload" /> Выберите файл
            </Button>
          </Upload>
        </StyledWrapper>
        <StyledBtnWrapp>
          <Button
            disabled={avatarFile === null}
            type="primary"
            onClick={this.handleUpload}
            loading={uploading}
            style={{ margin: '20px 5px', display: 'inline-block' }}
          >
            {uploading ? 'Загрузка...' : 'Загрузить аватар'}
          </Button>
          {resetBtn}
        </StyledBtnWrapp>
      </>
    );
  }
}

EditAvatar.contextType = Context;

EditAvatar.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
};

export default withRouter(EditAvatar);
