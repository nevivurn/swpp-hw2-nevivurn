import React, { useState } from 'react';
import { useHistory } from 'react-router';

const ArticleTabs = ({ openTab, setOpenTab }) => {
  return (
    <div>
      <button
        id='preview-tab-button'
        onClick={ () => setOpenTab('preview') }
      >
        preview
      </button>
      <button
        id='write-tab-button'
        onClick={ () => setOpenTab('write') }
      >
        write
      </button>
    </div>
  );
};

const ArticleEditButtons = ({ actionName, commit }) => {
  const history = useHistory();

  return (
    <div>
      <button
        id={`back-${actionName}-article-button`}
        onClick={ () => {history.push('/articles')} }
      >
        go back
      </button>
      <button
        id={`confirm-${actionName}-article-button`}
        onClick={commit}
      >
        save
      </button>
    </div>
  );
};

const ArticleWriteTab = ({ title, setTitle, content, setContent }) => {
  return (
    <div>
      <input
        id='article-title-input'
        type='text'
        value={title}
        onChange={ e => setTitle(e.target.value) }
      />
      <input
        id='article-content-input'
        type='text'
        value={content}
        onChange={ e => setContent(e.target.value) }
      />
    </div>
  );
};

const ArticlePreviewTab = ({ author, title, content }) => {
  return (
    <div>
      <p id='article-author'>{author.name}</p>
      <p id='article-title'>{title}</p>
      <p id='article-content'>{content}</p>
    </div>
  );
};

const ArticleEdit = ({ actionName, commit, author, article }) => {
  const [ openTab, setOpenTab ] = useState('write');
  const [ title, setTitle ] = useState(article && article.title ? article.title : '');
  const [ content, setContent ] = useState(article && article.content ? article.content : '');

  return (
    <div>
      <ArticleTabs openTab={openTab} setOpenTab={setOpenTab} />
      <ArticleEditButtons
        actionName={actionName}
        commit={
          () => {
            commit({
              author_id: author.id,
              title,
              content,
            });
          }
        }
      />
      { openTab === 'write'
        ? <ArticleWriteTab
            title={title}
            setTitle={setTitle}
            content={content}
            setContent={setContent}
          />
        : <ArticlePreviewTab
            author={author}
            title={title}
            content={content}
          /> }
    </div>
  );
};

export default ArticleEdit;
