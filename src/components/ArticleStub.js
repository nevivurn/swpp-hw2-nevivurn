import React from 'react';
import { useHistory } from 'react-router';

const ArticleStub = ({ article }) => {
  const history = useHistory();

  return (
    <div>
      <div>{article.id}</div>
      <button
        onClick={ () => { history.push(`/articles/${article.id}`) } }
      >
        {article.title}
      </button>
      <div>{article.author}</div>
    </div>
  );
};

export default ArticleStub;
