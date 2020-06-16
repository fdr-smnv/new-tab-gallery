import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import { Store } from 'webext-redux';
import { Provider } from 'react-redux';
import App from './components/app';

const proxyStore = new Store();

proxyStore.ready()
  .then(() => {
    ReactDOM.render(
      <Provider store={proxyStore}><App /></Provider>,
      document.getElementById('root'),
    );
  });
