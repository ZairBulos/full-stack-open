import { createContext, useReducer, useContext } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.payload;
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const useNotification = () => {
  const context = useContext(NotificationContext);
  return context;
};

export const NotificationProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null);

  const setNotification = (message) => {
    notificationDispatch({ type: 'SET_NOTIFICATION', payload: message });

    setTimeout(() => {
      notificationDispatch({ type: 'SET_NOTIFICATION', payload: null });
    }, 5000);
  };

  return(
    <NotificationContext.Provider value={{
      notification,
      setNotification
    }}>
      {props.children}
    </NotificationContext.Provider>
  );
};