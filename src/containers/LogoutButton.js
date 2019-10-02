import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import { loggedOut } from '../actions';

const LogoutButton = ({ loggedInUser, loggedOut }) => {
  return !loggedInUser ? <Redirect to='/login' /> : (
    <button
      id='logout-button'
      onClick={ () => loggedOut(loggedInUser.id) }
    >
      Logout
    </button>
  );
};

const mapStateToProps = state => ({
  loggedInUser: state.user.users.find(
    user => user && user.logged_in,
  ),
});

const mapDispatchToProps = dispatch => ({
  loggedOut: (id) => dispatch(loggedOut(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LogoutButton);
