import axios from 'axios';
import { setAlert } from './alert';
import { loadNeeder } from './auth';

import {
  GET_POST,
  GET_POSTS,
  POST_ERROR,
  ADD_POST,
  ADD_COMMENT,
  UPDATE_LIKES
} from './types';

export const getPosts = () => async dispatch => {
  try {
    const res = await axios.get('/api/posts');
    dispatch({
      type: GET_POSTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const getPostById = id => async dispatch => {
  try {
    const res = await axios.get(`/api/posts/postId/${id}`);

    dispatch({
      type: GET_POST,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const getMyPosts = () => async dispatch => {
  try {
    const res = await axios.get('/api/posts/myPosts');

    dispatch({
      type: GET_POSTS,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const getPostsByBlood = () => async dispatch => {
  try {
    const res = await axios.get('/api/posts/bloodGroup');

    dispatch({
      type: GET_POSTS,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const addLike = id => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/like/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const addPost = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'content-type': 'application/json'
      }
    };

    const res = await axios.post('/api/posts/newPost', formData, config);

    dispatch({
      type: ADD_POST,
      payload: res.data
    });

    dispatch(setAlert('Post Created', 'success'));
    dispatch(loadNeeder());
    dispatch(getMyPosts());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const addApplication = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'content-type': 'application/json'
      }
    };

    const res = await axios.post('/api/posts/addPost', formData, config);

    dispatch({
      type: GET_POST,
      payload: res.data
    });
    history.push('/posts/myPost');
    dispatch(setAlert('Post Created', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const addComment = (postId, formData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post(
      `/api/posts/comment/${postId}`,
      formData,
      config
    );

    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    });

    dispatch(setAlert('Comment Added', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
