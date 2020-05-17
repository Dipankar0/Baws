import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getMyPosts } from '../../actions/post';
import Moment from 'react-moment';
import PostItem from './PostItem';
import Spinner from '../layout/Spinner';

const MyPost = ({
  getMyPosts,
  post: { posts },
  auth: { isAuthenticated, loading, needer }
}) => {
  useEffect(() => {
    getMyPosts();
  }, [getMyPosts]);

  return (
    <Fragment>
      <div className='container'>
        {loading ? (
          <Fragment>
            <Spinner />
          </Fragment>
        ) : (
          <Fragment>
            {isAuthenticated &&
              needer !== null &&
              loading === false &&
              posts.length > 0 && (
                <Fragment>
                  <h1 className='text-deep'>
                    <i className='fas fa-user'></i> স্বাগতম {needer.name}
                  </h1>
                  <div className='my-3'>
                    {' '}
                    <p className='mid text-deep'>
                      <i class='fas fa-file-medical'></i> আপনার Applications
                    </p>
                    <div>
                      {posts.map(post => (
                        <div className='badge-white my-3'>
                          <div>
                            <p className='mid'>
                              <i class='fas fa-user-nurse'></i>{' '}
                              <Link
                                to={`/donors/postId/${post._id}`}
                                className='btn btn-primary'
                              >
                                {post.bloodGroup} রক্ত দাতা
                              </Link>
                            </p>
                          </div>
                          <PostItem
                            key={post._id}
                            post={post}
                            showActions={true}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </Fragment>
              )}
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

MyPost.propTypes = {
  auth: PropTypes.object.isRequired,
  getMyPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post
});

export default connect(mapStateToProps, { getMyPosts })(MyPost);
