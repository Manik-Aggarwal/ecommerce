import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux';
import store from './store';
import {positions, transitions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

const options = {
  timeout: 1000,
  position: positions.MIDDLE_CENTER,
  transition: transitions.SCALE,
  template: AlertTemplate,
  containerStyle: {
    zIndex: 9999,
    position: 'fixed',
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    fontSize: '1rem',
    fontWeight: 'bold',
    padding: '1rem',
}
};
ReactDOM.render(
  <Provider store = {store} >
    <AlertProvider template={AlertTemplate} {...options}>
    <App />
    </AlertProvider>
  </Provider>,
  document.getElementById('root')
);