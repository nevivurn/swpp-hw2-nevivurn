import React from 'react';
import { Router } from 'react-router';
import { mount } from 'enzyme';
import { createMemoryHistory } from 'history';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../reducers';
import Login from './Login';

describe('Login', () => {
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
    mount(
      <Provider store={store}>
        <Router history={history}>
          <Login/>
        </Router>
      </Provider>
    );
  });

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
          <Login/>
        </Router>
      </Provider>
    );

    const alrt = jest.spyOn(window, 'alert').mockImplementation(
      msg => expect(msg).toBe('Email or password is wrong'),
    );
    component.find('#login-button').simulate('click');
    expect(alrt).toHaveBeenCalled();
    component.find('#email-input').simulate('change', {target: {value: 'swpp@snu.ac.kr'}});
    component.find('#pw-input').simulate('change', {target: {value: 'iluvswpp'}});
    component.find('#login-button').simulate('click');
    expect(alrt).toHaveBeenCalledTimes(1);
    expect(history.location.pathname).toBe('/articles');
  });
});
