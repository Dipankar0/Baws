import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import admin from './admin';
import post from './post';

export default combineReducers({
  alert,
  auth,
  profile,
  admin,
  post
});
