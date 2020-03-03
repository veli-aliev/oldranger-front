import React from 'react';
import queries from '../../serverQueries';

const withGetUserProfile = WrapperComponent => {
  return class extends React.Component {
    state = {
      userProfile: {},
    };

    componentDidMount() {
      this.getUserPrpfile();
    }

    getUserPrpfile = async () => {
      try {
        const userProfile = await queries.getUserProfileData();
        this.setState({ userProfile });
      } catch {
        this.setState({ userProfile: {} });
      }
    };

    render() {
      const { userProfile } = this.state;
      return <WrapperComponent {...this.props} userProfile={userProfile} />;
    }
  };
};

export default withGetUserProfile;
