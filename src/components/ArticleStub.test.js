import React from 'react';
import { Router } from 'react-router';
import { mount } from 'enzyme';
import { createMemoryHistory } from 'history';
import ArticleStub from './ArticleStub';

describe('ArticleStub', () => {
  test('render', () => {
    const history = createMemoryHistory();
    mount(
      <Router history={history}>
        <ArticleStub
          article={{id: 1, title: 'title', author: 'author'}}
        />
      </Router>
    );
  });

  test('click details', () => {
    const history = createMemoryHistory();
    const component = mount(
      <Router history={history}>
        <ArticleStub
          article={{id: 1, title: 'title', author: 'author'}}
        />
      </Router>
    );

    component.find('button').simulate('click');
    expect(history.location.pathname).toBe('/articles/1');
  });
});
