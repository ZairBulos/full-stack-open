import { createSlice } from '@reduxjs/toolkit';
import loginService from '../services/login';
import blogService from '../services/blogs';
import { setNotification } from './notificationReducer';

const loginReducer = createSlice({
  name: 'login',
  initialState: null,
  reducers: {
    login(state, action) {
      return action.payload;
    },
    logout(state, action) {
      return action.payload;
    },
  }
});

export const { login, logout } = loginReducer.actions;

export const initializeLogin = () => {
  return async (dispatch) => {
    const loggedUser = window.localStorage.getItem('loggedUser');
    let user = null;

    if (loggedUser) {
      user = JSON.parse(loggedUser);
      blogService.setToken(user.token);
      dispatch(login(user));
    }
  };
};

export const logUserIn = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        username, password
      });

      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      blogService.setToken(user.token);

      dispatch(login(user));
    } catch (error) {
      dispatch(setNotification('wrong username or password', 5))
    }
  }
};

export const logUserOut = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('loggedUser');
    dispatch(logout(null));
  };
};

export default loginReducer.reducer;