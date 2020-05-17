import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import { getPosts } from '../../actions/post';

const Posts = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <Fragment>
      <div className='container'>
        {loading ? (
          <Spinner />
        ) : (
          <Fragment>
            <p className='welcome mid my-1 text-deep'>
              <i className='fas fa-user'></i> Welcome to Blood Source
            </p>
            <p className='mid text-deep'>
              <i class='fas fa-file-medical'></i> Applications
            </p>

            <div>
              {posts.map(post => (
                <div>
                  <PostItem key={post._id} post={post} />
                </div>
              ))}
            </div>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getPosts })(Posts);
