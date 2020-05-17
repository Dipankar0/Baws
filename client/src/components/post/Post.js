import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPostById } from '../../actions/post';
import Spinner from '../layout/Spinner';
import PostAbout from './PostAbout';
import CommentItem from './comments/CommentItem';
import CommentForm from './comments/CommentForm';

const Post = ({ getPostById, post: { post }, match }) => {
  useEffect(() => {
    getPostById(match.params.id);
  }, [getPostById, match.params.id]);

  return (
    <Fragment>
      <div className='container'>
        {post && post !== null && post._id === match.params.id ? (
          <Fragment>
            <p className='large text-deep my-1'>
              <i class='fas fa-file-medical'></i> Application
            </p>
            <PostAbout post={post} showActions={false} />
            <CommentForm postId={post._id} />
            <div className='comments'>
              {post.comments.map(comment => (
                <CommentItem
                  key={comment._id}
                  comment={comment}
                  post={post}
                  postId={post._id}
                />
              ))}
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <Spinner />
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

Post.propTypes = {
  getPostById: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getPostById })(Post);
