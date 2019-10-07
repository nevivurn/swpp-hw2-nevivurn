import axios from 'axios';

export const getArticles = () => {
  return async dispatch => {
    const { data } = await axios.get('/api/articles');
    return await dispatch({
      type: 'GET_ARTICLES',
      articles: data,
    });
  };
};

export const createArticle = (article, cb) => {
  return async dispatch => {
    const { data } = await axios.post(`/api/articles`, {...article});
    cb(data);
    return await dispatch({
      type: 'CREATE_ARTICLE',
      article: data,
    });
  };
};

export const editArticle = article => {
  return async dispatch => {
    const { data } = await axios.patch(`/api/articles/${article.id}`, {...article});
    return await dispatch({
      type: 'EDIT_ARTICLE',
      article: data,
    });
  };
};

export const getArticle = id => {
  return async dispatch => {
    const { data } = await axios.get(`/api/articles/${id}`);
    return await dispatch({
      type: 'GET_ARTICLE',
      article: data,
    });
  };
};

export const deleteArticle = articleId => {
  return async dispatch => {
    await axios.delete(`/api/articles/${articleId}`);
    return await dispatch({
      type: 'DELETE_ARTICLE',
      articleId,
    });
  };
};

export const getComments = () => {
  return async dispatch => {
    const { data } = await axios.get('/api/comments');
    return await dispatch({
      type: 'GET_COMMENTS',
      comments: data,
    });
  };
};

export const createComment = comment => {
  return async dispatch => {
    const { data } = await axios.post(`/api/comments`, {
      ...comment,
    });
    return await dispatch({
      type: 'CREATE_COMMENT',
      comment: data,
    });
  };
};

export const editComment = (commentId, content) => {
  return async dispatch => {
    const { data } = await axios.patch(`/api/comments/${commentId}`, {
      content,
    });

    return await dispatch({
      type: 'EDIT_COMMENT',
      commentId,
      content: data.content,
    });
  };
};

export const deleteComment = commentId => {
  return async dispatch => {
    await axios.delete(`/api/comments/${commentId}`);
    return await dispatch({
      type: 'DELETE_COMMENT',
      commentId,
    });
  };
};
