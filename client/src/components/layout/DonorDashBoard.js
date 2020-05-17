import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from './Spinner';
import { getPostsByBlood } from '../../actions/post';
import { getMyProfile } from '../../actions/profile';
import PostItem from '../post/PostItem';

const DonorDashBoard = ({
  post: { posts },
  auth: { isAuthenticated, loading, user },
  profile: { profile },
  getPostsByBlood,
  getMyProfile
}) => {
  useEffect(() => {
    getMyProfile();
    getPostsByBlood();
  }, [getMyProfile, getPostsByBlood]);

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
              loading === false &&
              user !== null &&
              posts !== null &&
              profile !== null && (
                <Fragment>
                  <h1 className='text-deep'>
                    <i className='fas fa-user'></i> {user.name}'s Dashboard
                  </h1>
                  <div className='my-3'>
                    {' '}
                    <p className='mid text-deep'>
                      <i class='fas fa-file-medical'></i> {user.bloodGroup}{' '}
                      Applications
                    </p>
                    <p className='mid text-deep'>
                      <i class='fas fa-map-marker-alt'></i> Near you
                    </p>
                    <Fragment>
                      {' '}
                      {posts.map(post => (
                        <Fragment>
                          {post.thana === profile.thana &&
                            post.bloodGroup === profile.bloodGroup && (
                              <div>
                                <PostItem
                                  key={post._id}
                                  post={post}
                                  showActions={true}
                                />
                              </div>
                            )}
                        </Fragment>
                      ))}
                    </Fragment>
                  </div>
                </Fragment>
              )}
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

DonorDashBoard.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  getMyProfile: PropTypes.func.isRequired,
  getPostsByBlood: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post,
  profile: state.profile
});

export default connect(mapStateToProps, { getPostsByBlood, getMyProfile })(
  DonorDashBoard
);
