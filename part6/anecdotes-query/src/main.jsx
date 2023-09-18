import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { QueryClient, QueryClientProvider } from 'react-query';
import { NotificationProvider } from './contexts/NotificationContext';
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NotificationProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </NotificationProvider>
  </React.StrictMode>
);