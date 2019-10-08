import React from 'react';
import { Router } from 'react-router';
import { mount, shallow } from 'enzyme';
import { createMemoryHistory } from 'history';
import ArticleList from './ArticleList';

describe('ArticleList', () => {
  test('render', () => {
    const history = createMemoryHistory();
    const component = mount(
      <Router history={history}>
        <ArticleList
          articles={[
            {id: 1, title: 'title', author_id: 1},
          ]}
          users={[
            {id: 1, name: 'author'}
          ]}
        />
      </Router>
    );
  });

  test('click create', () => {
    const history = createMemoryHistory();
    const component = mount(
      <Router history={history}>
        <ArticleList
          articles={[
            {id: 1, title: 'title', author_id: 1},
          ]}
          users={[
            {id: 1, name: 'author'}
          ]}
        />
      </Router>
    );

    component.find('#create-article-button').simulate('click');
    expect(history.location.pathname).toBe('/articles/create');
  });
});
