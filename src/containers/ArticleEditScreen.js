import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';

import{ editArticle } from '../actions';

import ArticleEdit from '../components/ArticleEdit';

const ArticleEditScreen = ({ loggedInUser, articles, editArticle }) => {
  const { id } = useParams();

  if (!loggedInUser) {
    return null;
  }

  const article = articles.find(article => article.id === Number(id));
  if (!article) {
    return null;
  }

  return (
    <ArticleEdit
      actionName='edit'
      commit={
        article => editArticle({ ...article, id })
      }
      author={loggedInUser}
      article={article}
    />
  );
};

const mapStateToProps = state => ({
  loggedInUser: state.user.users.find(user => user.logged_in),
  articles: state.article.articles,
});

const mapDispatchToProps = dispatch => ({
  editArticle: article => dispatch(editArticle(article)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArticleEditScreen);
