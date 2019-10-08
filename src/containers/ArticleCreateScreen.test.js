import React from 'react';
import { Router } from 'react-router';
import { mount } from 'enzyme';
import { createMemoryHistory } from 'history';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../reducers';
import * as ActionCreators from '../actions';
import ArticleCreateScreen from './ArticleCreateScreen';

describe('ArticleCreateScreen', () => {
  test('render empty', async () => {
    const store = createStore(reducer, applyMiddleware(
      store => next => action => {
        if (typeof action === 'function') return null;
        return next(action);
      },
    ));
    const history = createMemoryHistory();
    mount(
      <Provider store={store}>
        <Router history={history}>
          <ArticleCreateScreen/>
        </Router>
      </Provider>
    );
  });

  test('render', async () => {
    const store = createStore(reducer, {user: {users: [{id: 1, logged_in: true}]}}, applyMiddleware(
      store => next => action => {
        if (typeof action === 'function') return null;
        return next(action);
      },
    ));
    const history = createMemoryHistory();
    const component = mount(
      <Provider store={store}>
        <Router history={history}>
          <ArticleCreateScreen/>
        </Router>
      </Provider>
    );
    component.find('#confirm-create-article-button').simulate('click');
  });
});
