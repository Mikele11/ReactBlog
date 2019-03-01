import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPost, deletePost, logout } from './actions/postActions';
import store from './store';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import HeaderPanel from '../src/components/HeadPanel'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }
  
  componentDidMount() {
    if (window.location.search === '?ch=1') {
      this.props.history.push("/confirm");
    }
    if (localStorage.getItem('jwtToken')===null) {
      this.props.history.push("/login");
    } else {
      this.props.fetchPost();
      store.subscribe(()=>{
       console.log('fetch posts',store.getState());
      })
    }
  }

  logout = () => {
    localStorage.removeItem('jwtToken');
    window.location.reload();
  }

  onDelete(index){
    this.props.deletePost(this.props.posts[index]._id);
    store.subscribe(()=>{
      console.log('fetch posts',store.getState());
    }) 
  }
  
  render() {
    return (
      <div class="container">
      <HeaderPanel/>
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              BLOG &nbsp;
              {localStorage.getItem('jwtToken') &&
                <button class="btn btn-primary" onClick={this.logout}>Logout</button>
              }
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/create"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> Add Post</Link></h4>
            <div>
                {this.props.posts.map((post,index)  =>
                <div class="article">
                  <div class ="article_date">
                    <div>Recording time: </div>
                    <div>{post.date}</div>
                  </div>
                  <div>{post.description}</div>
                    <div class ="article_author">
                    <div>Author: </div>
                    <div>{post.author}</div>
                  </div>
                  <div class ="article_author">                                                    
                    <div><Link to={`/showcomment/${this.props.posts[index]._id}`}>Comments: </Link></div>
                    <div>{post.comment.length}</div>
                  </div>
                  <div class ="article_buttons">
                    <div>
                      <button class="btn btn-warning"><Link to={`/update/${this.props.posts[index]._id}`}>Update<i class="glyphicon glyphicon-edit"></i></Link></button>
                    </div>
                    <div><button class="btn btn-danger" onClick={this.onDelete.bind(this,index)}>Delete<i class="fa fa-trash-o" aria-hidden="true"></i></button></div>
                    <div>
                      <button class="btn btn-primary"><Link to={`/addcomment/${this.props.posts[index]._id}`}>add comments</Link></button>
                    </div>
                  </div>
                </div>
                )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
App.propTypes = {
  fetchPost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  posts: state.posts.postss,
});

export default connect(mapStateToProps, { fetchPost, deletePost, logout })(App);
