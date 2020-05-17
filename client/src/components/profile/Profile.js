import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import ProfileAbout from './ProfileAbout';
import { getCurrentProfileById } from '../../actions/profile';

const Profile = ({
  getCurrentProfileById,
  profile: { profile, loading },
  auth,
  match
}) => {
  useEffect(() => {
    getCurrentProfileById(match.params.id);
  }, [getCurrentProfileById, match.params.id]);
  return (
    <Fragment>
      <div className='container'>
        {profile === null || loading ? (
          <Spinner />
        ) : (
          <Fragment>
            {' '}
            {profile && profile.permission === 'approve' ? (
              <Fragment>
                <div className=''>
                  <ProfileAbout profile={profile} />
                </div>
                {auth.isAuthenticated &&
                  auth.loading === false &&
                  auth.user._id === profile.user._id && (
                    <Fragment>
                      <div style={{ marginTop: '0.5em' }}>
                        <Link to='/edit-profile' className='btn btn-dark'>
                          Edit Profile
                        </Link>
                      </div>
                    </Fragment>
                  )}
              </Fragment>
            ) : (
              <Fragment>
                {profile && profile.permission === 'request' ? (
                  <Fragment>
                    <h1>Your profile is under review by Admin</h1>
                    <p>You may receive a call from us for security purpose</p>
                    <p>Please login again to check your status</p>
                  </Fragment>
                ) : (
                  <Fragment>
                    <h1>Sorry, your profile was rejected by Admin</h1>
                    <p>
                      We highly appriciate your interest but you cannot join as
                      a blood donar
                    </p>
                    <small>
                      Please feel free to post in our Blood Post Box if you need
                      blood
                    </small>
                  </Fragment>
                )}
              </Fragment>
            )}
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

Profile.propTypes = {
  getCurrentProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});
export default connect(mapStateToProps, { getCurrentProfileById })(Profile);
