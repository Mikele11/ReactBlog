import React, { Component } from 'react';
import axios from 'axios';
import './Login.css';
import { Label } from 'reactstrap';

class UserProfile extends Component {
  constructor() {
    super();
    this.state = {
      id: null,
      address: '',
      firstName: '',
      lastName: ''
    };
  }

  componentDidMount() {
    const email = localStorage.getItem('email');
    var user = {};
    user.email = email
    axios.post(`/api/post/user`,  user )
      .then(res => {
        this.setState({ 
          address: res.data.address, 
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          id: res.data._id
        });
      })
      .catch((error) => {
          console.log('error',error)    
      });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { id, address, firstName, lastName } = this.state;
    var post={};
    post.address = address;
    post.firstName = firstName;
    post.lastName = lastName;
    axios.put(`/api/post/user/${id}`,post)
      .then((result) => {
        this.props.history.push("/")
      });
  }

  render() {
    const { address, firstName, lastName } = this.state;
    return (
      <div className="container">
        <form className="form-signin" onSubmit={this.onSubmit}>
          <h2 className="form-signin-heading">Profile data</h2>
          <Label for="firstName" className="sr-only">First Name</Label>
          <input type="text" className="form-control" placeholder="First Name" name="firstName" value={firstName} onChange={this.onChange} required/>
          <Label for="lastName" className="sr-only">Last Name</Label>
          <input type="text" className="form-control" placeholder="Last Name" name="lastName" value={lastName} onChange={this.onChange} required/>
          <Label for="address" className="sr-only">Address</Label>
          <input type="text" className="form-control" placeholder="Address" name="address" value={address} onChange={this.onChange} required/>
          <button className="btn btn-lg btn-primary btn-block" type="submit">update data</button>
        </form>
      </div>
    );
  }
}


export default UserProfile