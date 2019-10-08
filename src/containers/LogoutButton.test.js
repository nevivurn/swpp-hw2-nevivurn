import React from 'react';
import { Router } from 'react-router';
import { mount } from 'enzyme';
import { createMemoryHistory } from 'history';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../reducers';
import LogoutButton from './LogoutButton';

describe('LogoutButton', () => {
  test('render logged out', async () => {
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
          <LogoutButton/>
        </Router>
      </Provider>
    );
    expect(history.location.pathname).toBe('/login');
  });

  test('render logged in', async () => {
    const store = createStore(reducer, {
      user: { users: [{id: 1, logged_in: true}] },
    }, applyMiddleware(
      store => next => action => {
        if (typeof action === 'function') return null;
        return next(action);
      },
    ));
    const history = createMemoryHistory();
    const component = mount(
      <Provider store={store}>
        <Router history={history}>
          <LogoutButton/>
        </Router>
      </Provider>
    );

    component.find('#logout-button').simulate('click');
  });
});
