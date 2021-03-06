import {
  GET_POSTS,
  CLEAR_POST,
  GET_POST,
  POST_ERROR,
  UPDATE_LIKES,
  ADD_COMMENT
} from '../actions/types';

const initialState = {
  post: null,
  posts: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false
      };
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false
      };
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
        loading: false
      };
    case ADD_COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: payload },
        loading: false
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case CLEAR_POST:
      return {
        ...state,
        post: null,
        posts: null,
        loading: false
      };
    default:
      return state;
  }
}
