import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { getArticles, getComments, getUsers } from '../actions';

import ArticleList from '../components/ArticleList';

const ArticleListScreen = ({ articles, users, getArticles, getComments, getUsers }) => {
  useEffect(() => { getArticles() }, [getArticles]);
  useEffect(() => { getComments() }, [getComments]);
  useEffect(() => { getUsers() }, [getUsers]);
  return <ArticleList articles={articles} users={users}/>
};

const mapStateToProps = state => ({
  articles: state.article.articles,
  users: state.user.users,
});

const mapDispatchToProps = dispatch => ({
  getArticles: () => dispatch(getArticles()),
  getComments: () => dispatch(getComments()),
  getUsers: () => dispatch(getUsers()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleListScreen);
