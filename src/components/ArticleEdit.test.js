import React from 'react';
import { Router } from 'react-router';
import { mount } from 'enzyme';
import { createMemoryHistory } from 'history';
import ArticleEdit from './ArticleEdit';

describe('ArticleEdit', () => {
  test('render edit', () => {
    const history = createMemoryHistory();
    const commit = jest.fn();
    const component = mount(
      <Router history={history}>
        <ArticleEdit
          actionName='edit'
          commit={commit}
          author={{name: 'author'}}
          article={{title: 'title', content: 'content'}}
        />
      </Router>
    );

    component.find('#back-edit-article-button').simulate('click');
    expect(history.location.pathname).toBe('/articles')
    component.find('#confirm-edit-article-button').simulate('click');
    expect(commit).toHaveBeenCalled();

    expect(component.find('#article-title-input').prop('value')).toBe('title');
    component.find('#article-title-input').simulate('change', {target: {value: 'changed'}});
    expect(component.find('#article-title-input').prop('value')).toBe('changed');

    expect(component.find('#article-content-input').prop('value')).toBe('content');
    component.find('#article-content-input').simulate('change', {target: {value: 'changed'}});
    expect(component.find('#article-content-input').prop('value')).toBe('changed');

    component.find('#preview-tab-button').simulate('click');
    expect(component.find('#article-author').text()).toBe('author');
    expect(component.find('#article-title').text()).toBe('changed');
    expect(component.find('#article-content').text()).toBe('changed');

    component.find('#write-tab-button').simulate('click');
    expect(component.find('#article-title-input').prop('value')).toBe('changed');
    expect(component.find('#article-content-input').prop('value')).toBe('changed');
  });

  test('render create', () => {
    const history = createMemoryHistory();
    const commit = jest.fn();
    mount(
      <Router history={history}>
        <ArticleEdit
          actionName='create'
          commit={test}
          author='author'
        />
      </Router>
    );
  });
});
