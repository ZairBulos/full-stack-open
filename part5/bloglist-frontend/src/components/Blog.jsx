import { useState } from "react";

function Blog({ blog, updatedBlog, deleteBlog }) {
  const [visible, setVisible] = useState(false);

  const showWhenVisible = { display: visible ? '' : 'none' };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  const handleVisible = () => {
    setVisible(!visible);
  };

  const handleLike = () => {
    const likes = blog.likes + 1;
    const newBlog = {
      ...blog,
      likes
    };

    updatedBlog(newBlog);
  };

  const handleRemove = () => {
    if (window.confirm(`¿Remove blog ${blog.title}?`)) {
      deleteBlog(blog.id);
    }
  };

  return (
    <div style={blogStyle} className="blog">
      <div>
        <p>
          {blog.title} {blog.author}
        </p>
        <button id="view-blog" onClick={handleVisible}>
          {visible ? "hide" : "view"}
        </button>
      </div>

      <div style={showWhenVisible} className="blog-details">
        <div>
          {blog.url}
        </div>
        <div>
          likes {blog.likes}
          <button id="like-blog" onClick={handleLike}>
            like
          </button>
        </div>
        <div>
          {blog.user.name}
        </div>
        <div>
          <button id="remove-blog" onClick={handleRemove}>
            remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default Blog;