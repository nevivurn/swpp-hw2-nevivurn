import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';

import{ createArticle } from '../actions';
import ArticleEdit from '../components/ArticleEdit';

const ArticleCreateScreen = ({ loggedInUser, createArticle }) => {
  const history = useHistory();

  if (!loggedInUser) {
    return null;
  }

  const callback = article => history.push(`/articles/${article.id}`);

  return (
    <ArticleEdit
      actionName='create'
      commit={article => createArticle(article, callback)}
      author={loggedInUser}
    />
  );
};

const mapStateToProps = state => ({
  loggedInUser: state.user.users.find(user => user.logged_in),
});

const mapDispatchToProps = dispatch => ({
  createArticle: (article, cb) => dispatch(createArticle(article, cb)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArticleCreateScreen);
