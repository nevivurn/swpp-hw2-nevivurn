import React from 'react';
import { shallow } from 'enzyme';
import Comment from './Comment';

describe('Comment', () => {
  test('render non-self comment', () => {
    shallow(
      <Comment
        comment={{id: 1, author: 'author', content: 'content'}}
      />
    );
  });
  test('render self comment', () => {
    shallow(
      <Comment
        comment={{id: 1, author: 'author', content: 'content'}}
        isSelf={true}
      />
    );
  });
});
