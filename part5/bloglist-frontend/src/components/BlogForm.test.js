import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';

import BlogForm from './BlogForm';

describe('<BlogForm />', () => {
  test('calls onSubmit', () => {
    const createBlog = jest.fn();

    const component = render(
      <BlogForm createBlog={createBlog} />
    );

    const title = component.container.querySelector('#title');
    const author = component.container.querySelector('#author');
    const url = component.container.querySelector('#url');
    const form = component.container.querySelector('form');

    fireEvent.change(title, {
      target: { value: 'new title' }
    });
    fireEvent.change(author, {
      target: { value: 'new author' }
    });
    fireEvent.change(url, {
      target: { value: 'new url' }
    });
    fireEvent.submit(form);

    expect(createBlog.mock.calls).toHaveLength(1);
  });
});