import axios from 'axios';
import { setAlert } from './alert';
import { loadNeeder } from './auth';
import { getMyPosts } from './post';

import { GET_PROFILES, GET_PROFILE, PROFILE_ERROR } from './types';

export const createProfile = (formData, history, edit) => async dispatch => {
  try {
    const config = {
      headers: {
        'content-type': 'application/json'
      }
    };

    const res = await axios.post('/api/profile', formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });

    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

    if (edit || !edit) {
      history.push('/profile/me');
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const getCurrentProfileById = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/profile/profileId/${userId}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const getDonarById = profileId => async dispatch => {
  try {
    const res = await axios.get(`/api/profile/donarId/${profileId}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const getMyDonars = postId => async dispatch => {
  try {
    const res = await axios.get(`/api/profile/myDonars/${postId}`);
    dispatch({
      type: GET_PROFILES,
      payload: res.data
    });
    dispatch(loadNeeder());
    dispatch(getMyPosts());
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const getAllProfiles = () => async dispatch => {
  try {
    const res = await axios.get('/api/profile');
    dispatch({
      type: GET_PROFILES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const getAllDonars = () => async dispatch => {
  try {
    const res = await axios.get('/api/profile/donars');
    dispatch({
      type: GET_PROFILES,
      payload: res.data
    });
    dispatch(loadNeeder());
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const getMyProfile = () => async dispatch => {
  try {
    const res = await axios.get('/api/profile/me');
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
