const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((total, blog) => total + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.length === 0
    ? {}
    : blogs.reduce((favorite, blog) => {
      return blog.likes > favorite.likes ? blog : favorite;
    }, blogs[0]);
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return {};

  let authorCount = {};
  let maxAuthor = blogs[0].author;
  let maxBlogs = 0;

  blogs.forEach((blog) => {
    const author = blog.author;
    authorCount[author] = (authorCount[author] || 0) + 1;

    if (authorCount[author] > maxBlogs) {
      maxAuthor = author;
      maxBlogs = authorCount[author];
    }
  });

  return {
    author: maxAuthor,
    blogs: maxBlogs
  }
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return {};

  let authorCount = {};
  let maxAuthor = blogs[0].author;
  let maxLikes = 0;

  blogs.forEach((blog) => {
    const author = blog.author;
    const likes = blog.likes;
    authorCount[author] = (authorCount[author] || 0) + likes;

    if (authorCount[author] > maxLikes) {
      maxAuthor = author;
      maxLikes = authorCount[author];
    }
  });

  return {
    author: maxAuthor,
    likes: maxLikes
  }
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};