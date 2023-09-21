import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

const blogReducer = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
    changeBlog(state, action) {
      const changedBlog = action.payload;
      const { id } = changedBlog;

      return state.map((blog) =>
        blog.id !== id ? blog : changedBlog
      );
    },
    deleteBlog(state, action) {
      const id = action.payload;

      return state.filter((blog) => 
        blog.id !== id
      );
    }
  }
});

export const {
  appendBlog,
  setBlogs,
  addLike,
  changeBlog,
  deleteBlog
} = blogReducer.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  }
};

export const createBlog = (object) => {
  return async (dispatch) => {
    const savedBlog = await blogService.create(object);
    dispatch(appendBlog(savedBlog));
  }
};

export const addComment = (id, comment) => {
  return async (dispatch) => {
    const savedBlog = await blogService.createComment(id, comment);
    dispatch(changeBlog(savedBlog));
  }
};

export const updateBlog = (object) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(object);
    dispatch(changeBlog(updatedBlog));
  }
};

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id);
    dispatch(deleteBlog(id));
  }
};

export default blogReducer.reducer;