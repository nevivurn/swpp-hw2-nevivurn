import React from 'react';
import { connect } from 'react-redux';
import { useParams, useHistory } from 'react-router';

import{ editArticle } from '../actions';

import ArticleEdit from '../components/ArticleEdit';

const ArticleEditScreen = ({ loggedInUser, articles, editArticle }) => {
  const { id } = useParams();
  const history = useHistory();

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
        article => {
          editArticle({ ...article, id })
          history.push(`/articles/${id}`);
        }
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
