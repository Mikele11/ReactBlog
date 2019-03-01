import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPost } from '../actions/postActions';
import store from './../store';

class Create extends Component {

  constructor() {
    super();
    this.state = {
      date: new Date(),
      author: '',
      description: '',
	    comment:[]
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { date, author, description,comment } = this.state;
    var post={};
    post.date = date;
    post.author = author;
    post.description = description;
    post.comment = comment;
    this.props.createPost(post);
    store.subscribe(()=>{
      console.log('subscribenewPOST',store.getState());
    })
    this.props.history.push("/")
  }

  render() {
    const { author, description } = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              ADD POST
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/"><span class="glyphicon glyphicon-th-list" aria-hidden="true"></span> Post List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="author">Author:</label>
                <input type="text" class="form-control" name="author" value={author} onChange={this.onChange} placeholder="Author" />
              </div>
              <div class="form-group">
                <label for="description">Description:</label>
                <textArea class="form-control" name="description" onChange={this.onChange} placeholder="Description" cols="80" rows="3">{description}</textArea>
              </div>
              <button type="submit" class="btn btn-default">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Create.propTypes = {
  createPost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  posts: state.posts.postss,
});

export default connect(mapStateToProps, { createPost })(Create);
