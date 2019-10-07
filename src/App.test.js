import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { shallow, mount } from 'enzyme';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './reducers';


test('Root Component', () => {
  const component = shallow(<App/>);
  expect(component.find('.App').length).toBe(1);
});
