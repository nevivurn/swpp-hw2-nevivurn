import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, useHistory } from 'react-router';

import { getUsers, loggedIn } from '../actions'

// The login page.
const Login = ({ loggedInUser, getUsers, loggedIn }) => {
  const history = useHistory();
  const [ email, setEmail ] = useState('');
  const [ pass, setPass ] = useState('');
  useEffect(() => { getUsers() }, [getUsers]);

  // redirect to articles if we're alredy logged in, somehow...
  if (loggedInUser) {
    return <Redirect to='/articles' />;
  }

  // check creds, then log in & go to articles
  const onClick = () => {
    if (email !== 'swpp@snu.ac.kr' || pass !== 'iluvswpp') {
      alert('Email or password is wrong');
    } else {
      loggedIn(email);
      history.push('/articles');
    }
  };

  return (
    <div id='login'>
      <input
        id='email-input'
        type='text'
        value={email}
        onChange={ e => setEmail(e.target.value) }
      />
      <input
        id='pw-input'
        type='password'
        value={pass}
        onChange={ e => setPass(e.target.value) }
      />
      <button id='login-button' onClick={onClick}>
        Login
      </button>
    </div>
  );
};

const mapStateToProps = state => ({
  loggedInUser: state.user.users.find(user => user.logged_in),
});

const mapDispatchToProps = dispatch => ({
  getUsers: () => dispatch(getUsers()),
  loggedIn: email => dispatch(loggedIn(email)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
