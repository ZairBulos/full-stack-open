import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

const notificationReducer = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    createNotification(state, action) {
      return action.payload;
    }
  }
});

export const { createNotification } = notificationReducer.actions;

export const setNotification = (message, delay) => {
  return async (dispatch) => {
    dispatch(createNotification(message));

    setTimeout(() => {
      dispatch(createNotification(null));
    }, delay * 1000);
  };
}

export default notificationReducer.reducer;