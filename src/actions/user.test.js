import axios from 'axios';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers';

import {
  getUsers,
  loggedIn,
  loggedOut,
} from './user';

describe('User Actions', () => {
  afterEach(jest.clearAllMocks);

  test('getUsers', async () => {
    const store = createStore(reducer, applyMiddleware(thunk));

    const spy = jest.spyOn(axios, 'get').mockImplementation(
      async url => {
        expect(url).toBe('/api/user');
        return {data: [1, 2, 3]};
      },
    );

    await store.dispatch(getUsers());
    expect(spy).toHaveBeenCalled();
    expect(store.getState().user.users).toEqual([1, 2, 3]);
  });

  test('loggedIn', async () => {
    const store = createStore(reducer, {user: {users: [{id: 1, logged_in: false}]}}, applyMiddleware(thunk));

    const spy = jest.spyOn(axios, 'patch').mockImplementation(
      async url => {
        expect(url).toBe('/api/user/1');
        return {data: {id: 1, logged_in: true}};
      },
    );

    await store.dispatch(loggedIn(''));
    expect(spy).toHaveBeenCalled();
    expect(store.getState().user.users).toEqual([{id: 1, logged_in: true}]);
  });

  test('loggedOut', async () => {
    const store = createStore(reducer, {user: {users: [{id: 1, logged_in: true}]}}, applyMiddleware(thunk));

    const spy = jest.spyOn(axios, 'patch').mockImplementation(
      async url => {
        expect(url).toBe('/api/user/1');
        return {data: {id: 1, logged_in: false}};
      },
    );

    await store.dispatch(loggedOut(1));
    expect(spy).toHaveBeenCalled();
    expect(store.getState().user.users).toEqual([{id: 1, logged_in: false}]);
  });
})
