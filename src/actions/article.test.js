import axios from 'axios';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers';


import {
  getArticles,
  createArticle,
  editArticle,
  getArticle,
  deleteArticle,
  getComments,
  createComment,
  deleteComment,
  editComment,
} from './article';

describe('Article Actions', () => {
  afterEach(jest.clearAllMocks);

  test('getArticles', async () => {
    const store = createStore(reducer, applyMiddleware(thunk));

    const spy = jest.spyOn(axios, 'get').mockImplementation(
      async url => {
        expect(url).toBe('/api/articles');
        return {data: [1, 2, 3]};
      },
    );

    await store.dispatch(getArticles());
    expect(spy).toHaveBeenCalled();
    expect(store.getState().article.articles).toEqual([1, 2, 3]);
  });

  test('createArticle', async () => {
    const store = createStore(reducer, applyMiddleware(thunk));

    const spy = jest.spyOn(axios, 'post').mockImplementation(
      async (url, data) => {
        expect(url).toBe('/api/articles');
        return {data: {...data, id: 1}};
      },
    );

    const cb = jest.fn();

    await store.dispatch(createArticle({title: 'title'}, cb));
    expect(spy).toHaveBeenCalled();
    expect(cb).toHaveBeenCalled();
    expect(store.getState().article.articles).toEqual([{id: 1, title: 'title'}]);
  });

  test('editArticle', async () => {
    const store = createStore(reducer, {article: {articles: [{id: 1, title: ''}]}}, applyMiddleware(thunk));

    const spy = jest.spyOn(axios, 'patch').mockImplementation(
      async (url, data) => {
        expect(url).toBe('/api/articles/1');
        return {data: {...data}};
      },
    );

    await store.dispatch(editArticle({id: 1, title: 'title'}));
    expect(spy).toHaveBeenCalled();
    expect(store.getState().article.articles).toEqual([{id: 1, title: 'title'}]);
  });

  test('getArticle', async () => {
    const store = createStore(reducer, {article: {articles: [{id: 1, title: ''}]}}, applyMiddleware(thunk));

    const spy = jest.spyOn(axios, 'get').mockImplementation(
      async url => {
        expect(url).toBe('/api/articles/1');
        return {data: {id: 1, title: 'title'}};
      },
    );

    await store.dispatch(getArticle(1));
    expect(spy).toHaveBeenCalled();
    expect(store.getState().article.articles).toEqual([{id: 1, title: 'title'}]);
  });

  test('deleteArticle', async () => {
    const store = createStore(reducer, {article: {articles: [{id: 1, title: ''}]}}, applyMiddleware(thunk));

    const spy = jest.spyOn(axios, 'delete').mockImplementation(
      async url => {
        expect(url).toBe('/api/articles/1');
        return {data: {id: 1, title: 'title'}};
      },
    );

    await store.dispatch(deleteArticle(1));
    expect(spy).toHaveBeenCalled();
    expect(store.getState().article.articles).toEqual([]);
  });

  test('getComments', async () => {
    const store = createStore(reducer, applyMiddleware(thunk));

    const spy = jest.spyOn(axios, 'get').mockImplementation(
      async url => {
        expect(url).toBe('/api/comments');
        return {data: [{id: 1}]};
      },
    );

    await store.dispatch(getComments());
    expect(spy).toHaveBeenCalled();
    expect(store.getState().article.comments).toEqual([{id: 1}]);
  });

  test('createComment', async () => {
    const store = createStore(reducer, applyMiddleware(thunk));

    const spy = jest.spyOn(axios, 'post').mockImplementation(
      async (url, data) => {
        expect(url).toBe('/api/comments');
        return {data: {...data, id: 1}};
      },
    );

    await store.dispatch(createComment({content: 'content'}));
    expect(spy).toHaveBeenCalled();
    expect(store.getState().article.comments).toEqual([{id: 1, content: 'content'}]);
  });


  test('editComment', async () => {
    const store = createStore(reducer, {article: {comments: [{id: 1, content: ''}]}}, applyMiddleware(thunk));

    const spy = jest.spyOn(axios, 'patch').mockImplementation(
      async (url, data) => {
        expect(url).toBe('/api/comments/1');
        return {data};
      },
    );

    await store.dispatch(editComment(1, 'content'));
    expect(spy).toHaveBeenCalled();
    expect(store.getState().article.comments).toEqual([{id: 1, content: 'content'}]);
  });

  test('deleteComment', async () => {
    const store = createStore(reducer, {article: {comments: [{id: 1}]}}, applyMiddleware(thunk));

    const spy = jest.spyOn(axios, 'delete').mockImplementation(
      async url => {
        expect(url).toBe('/api/comments/1');
        return {id: 1};
      },
    );

    await store.dispatch(deleteComment(1));
    expect(spy).toHaveBeenCalled();
    expect(store.getState().article.comments).toEqual([]);
  });
});
