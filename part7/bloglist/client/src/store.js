import { configureStore } from '@reduxjs/toolkit';

import blogReducer from './reducers/blogReducer';
import userReducer from './reducers/userReducer';
import loginReducer from './reducers/loginReducer';
import notificationReducer from './reducers/notificationReducer';

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    users: userReducer,
    user: loginReducer
  }
});

export default store;