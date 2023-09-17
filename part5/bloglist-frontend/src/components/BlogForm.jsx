import { useState } from 'react';

function BlogForm({ createBlog }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const blog = {
      title: title,
      author: author,
      url: url
    };

    setTitle('');
    setAuthor('');
    setUrl('');

    createBlog(blog);
  };

  return (
    <div>
      <h2>create new</h2>
      
      <form onSubmit={handleSubmit}>
        <div>
          title
          <input
            type="text"
            id="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            type="text"
            id="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            type="text"
            id="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id="create-button" type="submit">
          create
        </button>
      </form>
    </div>
  );
}

export default BlogForm;