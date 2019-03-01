import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
//import Login from './components/Login';
//import Register from './components/Register';
import { RegisterPage } from './components/Register';
import { LoginPage } from './components/Login';
import Create from './components/Create';
import Update from './components/Upd';
import CreateCom from './components/CreateCom';
import Showcomment from './components/Showcomment';
import ResetPasswordPage from './components/ResetPasswordPageContainer';
import NewPassword from './components/NewPassword'
import UserProfile from './components/UserProfile'
import { Provider } from 'react-redux';
import store from './store';


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route exact path='/' component={App} />
        <Route path='/confirm' component={NewPassword} />
        <Route path='/login' component={LoginPage} />
        <Route path='/register' component={RegisterPage} />
        <Route path='/create' component={Create} />
        <Route path='/update' component={Update} />
        <Route path='/addcomment' component={CreateCom} />
        <Route path='/showcomment' component={Showcomment} />
        <Route path='/profile' component={UserProfile} />
        <Route exact path='/account/reset-password' component={ResetPasswordPage} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);

