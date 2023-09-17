import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';

import Blog from './Blog';

describe('<Blog />', () => {
  const blog = {
    title: 'Component testing is done',
    author: 'Some author',
    url: 'http://www.example.com',
    likes: 4,
    user: {
      username: 'username'
    }
  };

  test('renders content correctly', () => {
    const component = render(
      <Blog blog={blog} />
    );
  
    const div = component.container.querySelector('.blog');
  
    expect(div).toHaveTextContent('Component testing is done');
    expect(div).toHaveTextContent('Some author');
  });

  test('clicking View shows more content', () => {
    const component = render(
      <Blog blog={blog} />
    );

    const button = component.getByText('view');
    fireEvent.click(button);

    const div = component.container.querySelector('.allBlog');
    expect(div).toHaveTextContent('http://www.example.com');
    expect(div).toHaveTextContent('4');
  });

  test('clicking twice fires event twice', () => {
    const mockHandler = jest.fn();

    const component = render(
      <Blog blog={blog} updatedBlog={mockHandler} />
    );
    
    const button = component.getByText('like');
    fireEvent.click(button);
    fireEvent.click(button);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
