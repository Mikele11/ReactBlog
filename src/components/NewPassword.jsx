import React, { Component } from 'react';
import axios from 'axios';
import './Login.css';
import { Label } from 'reactstrap';

class NewPassword extends Component {

  constructor() {
    super();
    this.state = {
      password: ''
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { password } = this.state;

    axios.post('/api/auth/account/reset-password-render', { password })
      .then((result) => {
        this.props.history.push("/login")
      });
  }

  render() {
    const { password } = this.state;
    return (
      <div className="container">
        <form className="form-signin" onSubmit={this.onSubmit}>
          <h2 className="form-signin-heading">New password</h2>
          <Label for="password" className="sr-only">Password</Label>
          <input type="password" className="form-control" placeholder="Password" name="password" value={password} onChange={this.onChange} required/>
          <button className="btn btn-lg btn-primary btn-block" type="submit">new password</button>
        </form>
      </div>
    );
  }
}

export default NewPassword;