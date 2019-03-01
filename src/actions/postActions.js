import { FETCH_POST, FETCH_COMMENTS, NEW_COMMENT, NEW_POST, UPDATE_POST, DELETE_POST } from '../actions/types'
import axios from 'axios';
import { history } from '../_helpers';

export const fetchComments = id => async dispatch => {
  return await axios.get(`/api/post/comment/${id}`)
  .then(res => {
    dispatch({
      type: FETCH_COMMENTS,
      payload: res.data
    })
  })
  .catch((error) => {
    history.push("/");  
    console.log('action err',error)	  
  });
};


export const createComment = (id, commentData) => async dispatch => {
  return await axios.post(`/api/post/comment/${id}`,commentData)
    .then((res) =>{
        dispatch({
          type: NEW_COMMENT,
          payload: res.data
        })
      }
    )
    .catch(err =>{
      history.push("/")
      console.log('action err',err)
  });
};
export const logout = () => ({ type : 'AUTHENTICATION_LOGOUT' });  
export const fetchPost = () => async dispatch => {
  axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
  return await axios.get(`/api/post`)
    .then((res) =>{
      console.log('fetch_post',res.data)
        dispatch({
          type: FETCH_POST,
          payload: res.data
        })
      }
    )
    .catch(error =>{
      console.log('error',error)
      dispatch(logout(error))
  });
};

export const createPost = (postData) => async dispatch => {
  return await axios.post(`/api/post`,postData)
    .then((res) =>{
      console.log('new_post',res)
        dispatch({
          type: NEW_POST,
          payload: res.data
        })
      }
    )
    .catch(err =>{
      history.push("/")
      console.log('action err',err)
  });
};

export const deletePost = (id) => async dispatch => {
  return await axios.delete(`/api/post/${id}`)
    .then((res) =>{
      console.log('delete_post',res)
        dispatch({
          type: DELETE_POST,
          payload: res.data
        })
      }
    )
    .catch(err =>{
      history.push("/")
      console.log('action err',err)
  });
};

export const updatePost = (id,postData) => async dispatch => {
  return await axios.put(`/api/post/${id}`,postData)
    .then((res) =>{
      console.log('update_post',res)
        dispatch({
          type: UPDATE_POST,
          payload: res.data
        })
      }
    )
    .catch(err =>{
      console.log('action err',err)
  });
};

// Reset password

export const passwordResetHashCreated = () => ({ type: 'AUTHENTICATION_PASSWORD_RESET_HASH_CREATED' });
export const passwordResetHashFailure = () => ({ type: 'AUTHENTICATION_PASSWORD_RESET_HASH_FAILURE' });
export const passwordResetClear = () => ({ type : 'AUTHENTICATION_PASSWORD_RESET_CLEAR' });      

export function createHash(email) {
  return async (dispatch) => {
    await fetch(
      '/api/auth/saveresethash',
      {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
      },
    )
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      return null;
    })
    .then((json) => {
      if (json.username) {
        return dispatch(passwordResetHashCreated(json));
      }
      return dispatch(passwordResetHashFailure(new Error('Something went wrong. Please try again.')));
    })
    .catch(error => dispatch(passwordResetHashFailure(error)));
  };
}

