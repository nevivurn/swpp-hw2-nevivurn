import React from 'react';
import { Router } from 'react-router';
import { mount } from 'enzyme';
import { createMemoryHistory } from 'history';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../reducers';
import ArticleEditScreen from './ArticleEditScreen';

describe('ArticleEditScreen', () => {
  test('render', async () => {
    const store = createStore(reducer);
    const history = createMemoryHistory();
    const component = mount(
      <Provider store={store}>
        <Router history={history}>
          <ArticleEditScreen/>
        </Router>
      </Provider>
    );
  });
});
