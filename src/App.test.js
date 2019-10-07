import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { shallow } from 'enzyme';

test('Root Component', () => {
  const component = shallow(<App/>);
  expect(component.find('.App').length).toBe(1);
});
