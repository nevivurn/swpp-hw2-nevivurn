import React from 'react';

const Comment = ({ comment, isSelf, editComment, deleteComment }) => {
  const authorButtons = !isSelf ? null : (
    <>
      <button
        id='edit-comment-button'
        onClick={editComment}
      >
        edit comment
      </button>
      <button
        id='delete-comment-button'
        onClick={deleteComment}
      >
        delete comment
      </button>
    </>
  );

  return (
    <div>
      <div>{comment.id}</div>
      <div>{comment.author}</div>
      <div>{comment.content}</div>
      {authorButtons}
    </div>
  );
};

export default Comment;
