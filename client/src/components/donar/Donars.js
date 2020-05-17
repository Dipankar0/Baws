import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getMyDonars } from '../../actions/profile';
import { getPostById } from '../../actions/post';
import Spinner from '../layout/Spinner';

const Donars = ({
  profile: { profiles, profile, loading },
  auth: { isAuthenticated, needer, user },
  post: { post },
  getMyDonars,
  getPostById,
  match
}) => {
  useEffect(() => {
    getMyDonars(match.params.id);
    getPostById(match.params.id);
  }, [getMyDonars, getPostById, match.params.id]);

  return (
    <Fragment>
      <div className='container'>
        {loading ? (
          <Fragment>
            <Spinner />
          </Fragment>
        ) : (
          <Fragment>
            {' '}
            {isAuthenticated &&
            needer !== null &&
            user === null &&
            post !== null ? (
              <Fragment>
                {' '}
                {profiles && profiles.length > 0 ? (
                  <Fragment>
                    <p className='mid text-red'>
                      <i class='fas fa-user-nurse'></i> যারা এই মুহূর্তে রক্ত
                      দিতে প্রস্তুত
                    </p>
                    <p className='mid text-deep'>
                      <i class='fas fa-map-marker-alt'></i> আপনার কাছাকাছি
                    </p>
                    {profiles.map(profile => (
                      <Fragment>
                        {profile.can === 'yes' && profile.thana === post.thana && (
                          <Fragment>
                            <div className='posts bg-white p-1 my-2'>
                              <p className='lead text-deep my-1'>
                                <i class='fas fa-portrait' />{' '}
                                {profile.user.name}
                              </p>
                              <p className='lead text-deep my-1'>
                                <i class='fas fa-map-marker-alt'></i>{' '}
                                {profile.thana}
                              </p>
                              <Link
                                className='btn btn-danger'
                                to={`/profile/donorId/${profile._id}`}
                                profile={profile}
                              >
                                View Profile
                              </Link>
                            </div>
                          </Fragment>
                        )}
                      </Fragment>
                    ))}
                    <br />
                    <br />
                    <p className='mid text-deep'>
                      <i class='fas fa-portrait' /> অন্যান্য সবাই
                    </p>
                    {profiles.map(profile => (
                      <Fragment>
                        {profile.can === 'yes' && profile.thana !== post.thana && (
                          <Fragment>
                            <div className='posts bg-white p-1 my-2'>
                              <p className='lead text-deep my-1'>
                                <i class='fas fa-portrait' />{' '}
                                {profile.user.name}
                              </p>
                              <p className='lead text-deep my-1'>
                                <i class='fas fa-map-marker-alt'></i>{' '}
                                {profile.thana}
                              </p>
                              <Link
                                className='btn btn-danger'
                                to={`/profile/donorId/${profile._id}`}
                                profile={profile}
                              >
                                View Profile
                              </Link>
                            </div>
                          </Fragment>
                        )}
                      </Fragment>
                    ))}
                  </Fragment>
                ) : (
                  <Fragment>
                    {needer !== null &&
                      profile === null &&
                      profiles.length < 1 && (
                        <Fragment>
                          <p className='mid tex-deep'>
                            <i class='fas fa-frown'></i> বর্তমানে{' '}
                            {post.bloodGroup} রক্তদাতা কেউ নেই.
                          </p>
                          <p className='lead tex-deep'>
                            <i class='fas fa-praying-hands'></i> অনুগ্রহ করে
                            পরবর্তীতে আবার চেষ্টা করুন
                          </p>
                        </Fragment>
                      )}
                  </Fragment>
                )}
              </Fragment>
            ) : (
              <Fragment>
                {isAuthenticated && user !== null && needer === null && (
                  <p className='mid tex-deep'>
                    Create <Link to='/newApplication'>New Application</Link> to
                    get Donars
                  </p>
                )}
              </Fragment>
            )}
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

Donars.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  getMyDonars: PropTypes.func.isRequired,
  getPostById: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  post: state.post
});

export default connect(mapStateToProps, { getMyDonars, getPostById })(Donars);
