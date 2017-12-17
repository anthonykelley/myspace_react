import axios from 'axios';

export const getPosts = (cb) => {
  return (dispatch) => {
    axios.get('/api/posts')
      .then( res => dispatch({ type: 'POSTS', posts: res.data }) )
      .then( cb() )
  }
}

export const addPost = (post) => {
  return (dispatch) => {
    axios.post('/api/apps', { post })
      .then( res => dispatch({ type: 'ADD_POST', post: res.data }) )
  }
}