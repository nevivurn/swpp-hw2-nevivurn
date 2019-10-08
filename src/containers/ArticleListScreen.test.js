import React from 'react';
import { Router } from 'react-router';
import { mount } from 'enzyme';
import { createMemoryHistory } from 'history';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../reducers';
import ArticleListScreen from './ArticleListScreen';

describe('ArticleListScreen', () => {
  test('render', async () => {
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
          <ArticleListScreen/>
        </Router>
      </Provider>
    );
  });
});
