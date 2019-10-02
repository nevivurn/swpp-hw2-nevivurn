import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router';
import { connect } from 'react-redux';

import{
  getArticle,
  deleteArticle,
  createComment,
  deleteComment,
  editComment,
} from '../actions';

import ArticleDetail from '../components/ArticleDetail';

const ArticleDetailScreen = ({
  loggedInUser,
  articles,
  comments,
  users,
  getArticle,
  deleteArticle,
  createComment,
  deleteComment,
  editComment,
}) => {
  const { id } = useParams();
  const history = useHistory();
  useEffect(() => { getArticle(id) }, [getArticle, id]);
  
  if (!loggedInUser) {
    return null;
  }

  const article = articles.find(article => article.id === Number(id));
  if (!article) {
    return null;
  }

  return (
    <ArticleDetail
      loggedInUser={loggedInUser}
      article={article}
      comments={comments.filter(
        comment => comment.article_id === article.id,
      ).map(
        comment => ({
          ...comment,
          author: users.find(user => user.id === comment.author_id).name,
        }),
      )}
      isSelf={ article.author_id === loggedInUser.id }
      deleteArticle={ () => {
        deleteArticle(article.id);
        history.push('/articles');
      }}
      createComment={ content => {
        createComment({
            article_id: article.id,
            author_id: loggedInUser.id,
            content: content,
        });
      }}
      deleteComment={(commentId) => deleteComment(commentId)}
      editComment={editComment}
    />
  );
};

const mapStateToProps = state => ({
  loggedInUser: state.user.users.find(user => user.logged_in),
  articles: state.article.articles,
  comments: state.article.comments,
  users: state.user.users,
});

const mapDispatchToProps = dispatch => ({
  getArticle: id => dispatch(getArticle(id)),
  deleteArticle: id => dispatch(deleteArticle(id)),
  createComment: comment => dispatch(createComment(comment)),
  deleteComment: id => dispatch(deleteComment(id)),
  editComment: (id, content) => dispatch(editComment(id, content)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArticleDetailScreen);
