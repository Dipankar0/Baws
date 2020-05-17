import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../../actions/post';

const CommentForm = ({
  postId,
  addComment,
  auth: { isAuthenticated, user, needer }
}) => {
  const [comment, setComment] = useState({
    name: '',
    donar: '',
    text: ''
  });

  if (isAuthenticated && user !== null && needer === null) {
    comment.name = user.name;
    comment.donar = user._id;
  }
  if (isAuthenticated && needer !== null && needer !== null) {
    comment.name = needer.name;
  }

  const { name, text } = comment;

  const onChange = e => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    addComment(postId, comment);
    setComment({
      name: '',
      text: ''
    });
  };

  return (
    <div className='post-form'>
      <p className='lead text-deep'>
        {' '}
        <i class='fas fa-comment-alt' /> Comments
      </p>
      {!isAuthenticated ? (
        <Fragment>
          <form className='form my-1' onSubmit={e => onSubmit(e)}>
            <div className='form-group'>
              <textarea
                name='text'
                cols='30'
                rows='2'
                placeholder='Leave your comment'
                value={text}
                onChange={e => onChange(e)}
                required
              />
            </div>
            <div className='form-group'>
              <input
                type='text'
                cols='20'
                placeholder='Your Name'
                name='name'
                value={name}
                onChange={e => onChange(e)}
              />
            </div>
            <input
              type='submit'
              className='btn btn-danger my-1'
              value='Submit'
            />
          </form>
        </Fragment>
      ) : (
        <Fragment>
          {isAuthenticated && user !== null && needer === null && (
            <Fragment>
              <form className='form my-1' onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                  <textarea
                    name='text'
                    cols='30'
                    rows='2'
                    placeholder='Leave your comment'
                    value={text}
                    onChange={e => onChange(e)}
                    required
                  />
                </div>
                <input
                  type='submit'
                  className='btn btn-danger my-1'
                  value='Submit'
                />
              </form>
            </Fragment>
          )}
          {isAuthenticated && needer !== null && needer !== null && (
            <Fragment>
              <form className='form my-1' onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                  <textarea
                    name='text'
                    cols='30'
                    rows='2'
                    placeholder='Leave your comment'
                    value={text}
                    onChange={e => onChange(e)}
                    required
                  />
                </div>
                <input
                  type='submit'
                  className='btn btn-danger my-1'
                  value='Submit'
                />
              </form>
            </Fragment>
          )}
        </Fragment>
      )}
    </div>
  );
};

CommentForm.propTypes = {
  auth: PropTypes.object.isRequired,
  addComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { addComment })(CommentForm);
