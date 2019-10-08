import React from 'react';
import { Router, Route } from 'react-router';
import { mount } from 'enzyme';
import { createMemoryHistory } from 'history';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../reducers';
import ArticleDetailScreen from './ArticleDetailScreen';

describe('ArticleDetailScreen', () => {
  test('render empty', async () => {
    const store = createStore(reducer, applyMiddleware(
      store => next => action => {
        if (typeof action === 'function') return null;
        return next(action);
      },
    ));
    const history = createMemoryHistory();
    const component = mount(
      <Provider store={store}>
        <Router history={history}>
          <Route path='/articles/:id'>
          <ArticleDetailScreen/>
          </Route>
        </Router>
      </Provider>
    );
  });

  test('render', async () => {
    const store = createStore(reducer, {
      user: { users: [{id: 1, logged_in: true}] },
      article: { articles: [{id: 1}] },
    }, applyMiddleware(
      store => next => action => {
        if (typeof action === 'function') return null;
        return next(action);
      },
    ));
    const history = createMemoryHistory();
    mount(
      <Provider store={store}>
        <Router history={history}>
          <ArticleDetailScreen/>
        </Router>
      </Provider>
    );
  });
});

