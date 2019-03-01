import React from 'react';
import { connect } from 'react-redux';
import { createHash } from '../actions/postActions';

import ResetPasswordPage from './ResetPasswordPage';

export class ResetPasswordPageContainer extends React.Component {

  resetPasswordRequest = email => {
    const { dispatch } = this.props;
    dispatch(createHash(email));
  }

  render() {
    return (
      <ResetPasswordPage resetPasswordFunction={this.resetPasswordRequest} />
    );
  }
}

export default connect()(ResetPasswordPageContainer);