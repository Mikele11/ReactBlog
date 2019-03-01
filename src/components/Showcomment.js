import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchComments } from '../actions/postActions';
import store from './../store';

class Showcomment extends Component {
  
  componentWillMount() {
    var loc = window.location.pathname;
    var revloc = loc.split("").reverse().join("");
    var ind = revloc.substring(0,revloc.indexOf('/'));
    ind = ind.split("").reverse().join("");
    this.props.fetchComments(ind);
    store.subscribe(()=>{
      console.log('subscribe',store.getState());
    })
  }

  render() {
    if (Array.isArray(this.props.posts)){
      var postItems = this.props.posts.map(coment => (
        <div class="article">
          <div>{coment.description}</div>
				  <div class ="article_author">
						<div>Author: </div>
						<div>{coment.author}</div>
					</div>
        </div>
      ));
    }else{
      var postItems = this.props.posts.comment.map(onecoment => (
        <div class="article">
          <div>{onecoment.description}</div>
				  <div class ="article_author">
						<div>Author: </div>
						<div>{onecoment.author}</div>
					</div>
        </div>
      ));
    }
    return (
      <div>
        <h1>Comments</h1>
        {postItems}
      </div>
    );
  }
}

Showcomment.propTypes = {
  fetchComments: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  posts: state.posts.coments
});

export default connect(mapStateToProps, { fetchComments })(Showcomment);