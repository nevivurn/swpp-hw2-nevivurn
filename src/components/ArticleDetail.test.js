import React from 'react';
import { Router } from 'react-router';
import { mount } from 'enzyme';
import { createMemoryHistory } from 'history';
import ArticleDetail from './ArticleDetail';

describe('ArticleDetail', () => {
  test('render non-self', () => {
    const history = createMemoryHistory();
    const createComment = jest.fn();
    const deleteComment = jest.fn();
    const editComment = jest.fn();
    const component = mount(
      <Router history={history}>
        <ArticleDetail
          loggedInUser={{}}
          article={{}}
          comments={[]}
          isSelf={false}
          createComment={createComment}
          editComment={editComment}
          deleteComment={deleteComment}
        />
      </Router>
    );

    expect(component.find('#edit-article-button').length).toBe(0);
    expect(component.find('#delete-article-button').length).toBe(0);
  });

  test('render self', () => {
    const history = createMemoryHistory();
    const deleteArticle = jest.fn();
    const createComment = jest.fn();
    const deleteComment = jest.fn();
    const editComment = jest.fn();
    const component = mount(
      <Router history={history}>
        <ArticleDetail
          loggedInUser={{id: 1}}
          article={{id: 1}}
          comments={[{id: 1, author_id: 1, content: 'content'}]}
          isSelf={true}
          deleteArticle={deleteArticle}
          createComment={createComment}
          editComment={editComment}
          deleteComment={deleteComment}
        />
      </Router>
    );

    component.find('#edit-article-button').simulate('click');
    expect(history.location.pathname).toBe('/articles/1/edit');
    component.find('#delete-article-button').simulate('click');
    expect(deleteArticle).toHaveBeenCalled();

    jest.spyOn(window, 'prompt').mockImplementation(() => 'changed');
    component.find('#edit-comment-button').simulate('click');
    expect(editComment).toHaveBeenCalled();
    jest.spyOn(window, 'prompt').mockImplementation(() => null);
    component.find('#edit-comment-button').simulate('click');
    expect(editComment).toHaveBeenCalledTimes(1);

    component.find('#delete-comment-button').simulate('click');
    expect(deleteComment).toHaveBeenCalled();

    expect(component.find('#confirm-create-comment-button').prop('disabled')).toBeTruthy();
    component.find('#new-comment-content-input').simulate('change', {target: {value: 'changed'}});
    expect(component.find('#confirm-create-comment-button').prop('disabled')).toBeFalsy();

    component.find('#confirm-create-comment-button').simulate('click');
    expect(createComment).toHaveBeenCalled();

    component.find('#back-detail-article-button').simulate('click');
    expect(history.location.pathname).toBe('/articles');
  });
});
