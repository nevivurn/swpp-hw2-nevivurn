import React from 'react';
import { connect } from 'react-redux';

import{ createArticle } from '../actions';
import ArticleEdit from '../components/ArticleEdit';

const ArticleCreateScreen = ({ loggedInUser, createArticle }) => {
  if (!loggedInUser) {
    return null;
  }

  return (
    <ArticleEdit
      actionName='create'
      commit={createArticle}
      author={loggedInUser}
    />
  );
};

const mapStateToProps = state => ({
  loggedInUser: state.user.users.find(user => user.logged_in),
});

const mapDispatchToProps = dispatch => ({
  createArticle: article => dispatch(createArticle(article)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArticleCreateScreen);
