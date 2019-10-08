import React from 'react';
import { useHistory } from 'react-router';

import ArticleStub from './ArticleStub';

// A list of articles.
const ArticleList = ({ articles, users }) => {
  const history = useHistory();

  const authoredArticles = articles.map(
    article => ({
      ...article,
      author: users[article.author_id-1].name,
    }),
  );

  const articleStubs = authoredArticles.map(
    (article, index) => (
      <div key={index}>
        <hr/>
        <ArticleStub article={article} />
      </div>
    )
  );

  return (
    <div>
      <button
        id='create-article-button'
        onClick={ () => history.push('/articles/create') }
      >
        create article
      </button>
      {articleStubs}
    </div>
  );
};

export default ArticleList;
