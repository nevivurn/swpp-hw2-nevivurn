const initialState = {
  articles: [],
  comments: [],
};

const article = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ARTICLES':
      return { ...state, articles: action.articles };

    case 'CREATE_ARTICLE':
      const createArticles = [ ...state.articles, action.article ];
      return { ...state, articles: createArticles };

    case 'EDIT_ARTICLE':
      const editArticles = state.articles.map(
        article => article.id !== action.article.id
          ? article
          : action.article,
      );
      return { ...state, articles: editArticles };

    case 'GET_ARTICLE':
      const getArticles = state.articles.map(
        article => article.id !== action.article.id ?
          article : action.article,
      );
      return { ...state, articles: getArticles };

    case 'DELETE_ARTICLE':
      const delArticles = state.articles.filter(
        article => article.id !== action.articleId,
      );
      return { ...state, articles: delArticles };

    case 'GET_COMMENTS':
      return { ...state, comments: action.comments };

    case 'CREATE_COMMENT':
      const createComments = [ ...state.comments, action.comment ];
      return { ...state, comments: createComments };

    case 'DELETE_COMMENT':
      const delComments = state.comments.filter(
        comment => comment.id !== action.commentId,
      );
      return { ...state, comments: delComments };

    case 'EDIT_COMMENT':
      const editComments = state.comments.map(
        comment => comment.id !== action.commentId ? comment : ({
          ...comment,
          commentId: action.commentId,
          content: action.content,
        }),
      );
      return { ...state, comments: editComments };

    default:
      return state;
  }
};

export default article;
