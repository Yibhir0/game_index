import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { NotificationsProvider } from '@mantine/notifications';
import { MantineProvider } from '@mantine/core';




ReactDOM.render((
  <BrowserRouter>
    <MantineProvider>
      <NotificationsProvider>
        <App />
      </NotificationsProvider>
    </MantineProvider>
  </BrowserRouter>),
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
