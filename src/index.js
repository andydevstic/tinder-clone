import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import './index.css';
import 'antd/dist/antd.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import store from './state';
import { HomePage } from './pages/home';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <div className='app'>
          <Route path="/" exact={true}>
            <HomePage />
          </Route>
        </div>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();