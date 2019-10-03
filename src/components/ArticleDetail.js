import React, { useState } from 'react';
import { useHistory } from 'react-router';

import Comment from '../components/Comment';

const ArticleDetail =({
  loggedInUser,
  article,
  comments,
  isSelf,
  deleteArticle,
  createComment,
  deleteComment,
  editComment,
}) => {
  const history = useHistory();
  const [ newComment, setNewComment ] = useState('');

  const articleButtons = !isSelf ? null : (
    <>
      <button
        id='edit-article-button'
        onClick={ () => history.push(`/articles/${article.id}/edit`) }
      >
        edit article
      </button>
      <button
        id='delete-article-button'
        onClick={deleteArticle}
      >
        delete article
      </button>
    </>
  );

  const commentsRender = comments.map(
    (comment, index) => (
      <div key={index}>
        <hr/>
        <Comment
          comment={comment}
          isSelf={comment.author_id === loggedInUser.id}
          deleteComment={() => deleteComment(comment.id)}
          editComment={() => {
            const edited = prompt('edit comment', comment.content);
            if (edited) {
              editComment(comment.id, edited);
            }
          }}
        />
      </div>
    ),
  );

  return (
    <div>
      <p id='article-author'>{article.author}</p>
      <p id='article-title'>{article.title}</p>
      <p id='article-content'>{article.content}</p>
      <input
        id='new-comment-content-input'
        type='text'
        value={newComment}
        onChange={ e => setNewComment(e.target.value) }
      />
      <button
        id='confirm-create-comment-button'
        disabled={!newComment}
        onClick={() => {
          createComment(newComment);
        }}
      >
        create comment
      </button>
      <button
        id='back-detail-article-button'
        onClick={ () => history.push(`/articles`) }
      >
        go back
      </button>
      {articleButtons}
      {commentsRender}
    </div>
  );
};

export default ArticleDetail;
