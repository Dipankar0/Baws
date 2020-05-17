import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import ProfileAbout from './ProfileAbout';
import { getMyProfile } from '../../actions/profile';

const MyProfile = ({ getMyProfile, profile: { profile }, auth }) => {
  useEffect(() => {
    getMyProfile();
  }, [getMyProfile]);
  return (
    <Fragment>
      <div className='container'>
        {auth.isAuthenticated && auth.user !== null && profile !== null && (
          <Fragment>
            {auth.isAuthenticated && profile.permission === 'approve' ? (
              <Fragment>
                {profile.bio &&
                profile.bio !== null &&
                profile.profession !== null ? (
                  <Fragment>
                    {auth.isAuthenticated &&
                      auth.loading === false &&
                      auth.user._id === profile.user._id && (
                        <Fragment>
                          <div
                            className='welcome text-deep my-1'
                            style={{ marginTop: '0.5em' }}
                          >
                            <p className='mid'>
                              <i class='fas fa-user-nurse'></i> Welcome To Blood
                              Source
                            </p>
                            <p className='mid my-1'>
                              <i class='fas fa-smile'></i> Happy Blood Sharing
                            </p>
                          </div>
                          <div className=''>
                            <ProfileAbout profile={profile} />
                          </div>
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
                    {auth.isAuthenticated &&
                      auth.loading === false &&
                      auth.user._id === profile.user._id && (
                        <Fragment>
                          <div className='my-1' style={{ marginTop: '0.5em' }}>
                            <p className='mid text-deep'>
                              <i class='fas fa-user-nurse'></i> Blood Source এ
                              আপনাকে স্বাগতম
                            </p>
                            <p className='mid text-deep'>
                              <i class='fas fa-heart'></i> We are proud to have
                              you
                            </p>
                            <p className='mid my-1'>
                              <i class='fas fa-smile'></i> Happy Blood Sharing
                            </p>
                            <Link to='/edit-profile' className='btn btn-dark'>
                              Complete Profile
                            </Link>
                          </div>
                          <div className=''>
                            <ProfileAbout profile={profile} />
                          </div>
                        </Fragment>
                      )}
                  </Fragment>
                )}
              </Fragment>
            ) : (
              <Fragment>
                {auth.isAuthenticated && profile.permission === 'request' ? (
                  <Fragment>
                    <p className='mid text-deep'>
                      <i class='fas fa-user-nurse'></i>
                      রক্ত দানের এই অনন্য প্ল্যাটফর্মটিতে আপনাকে স্বাগতম
                    </p>
                    <p className='mid text-deep'>
                      <i class='fas fa-heart'></i> আমাদের সাথে যুক্ত হওয়ার অসীম
                      আগ্রহ ও রক্তদানের প্রবল ইচ্ছাকে স্বাগতম জানানোর জন্য
                      ধন্যবাদ দেয়া ব্যতীত আর কোনো ভাষা আমাদের জানা নেই
                    </p>
                    <p className='lead text-deep'>
                      আমাদের এই মহৎ কাজের পরিবেশটিকে স্বচ্ছ রাখার উদ্দেশ্যে আমরা
                      প্রাথমিক পর্যায়ে প্রোফাইলগুলো যাচাই করে থাকি। আপনার
                      প্রোফাইলটি যাচাইয়ের জন্য আমাদের কিছু সময় লাগবে। আপনি হয়তো
                      আমাদের কাছ থেকে আপনার মোবাইলে কল পেতে পারেন। আপনার
                      প্রোফাইলের অবস্থা জানতে দয়া করে পরে লগইন করে দেখার জন্য
                      বিনীত অনুরোধ করা হচ্ছে। সাময়িক অসুবিধার জন্য আন্তরিকভাবে
                      দুঃখিত
                    </p>
                  </Fragment>
                ) : (
                  <Fragment>
                    {auth.isAuthenticated && profile.permission === 'reject' && (
                      <Fragment>
                        <h1>Sorry, your profile was rejected by Admin</h1>
                        <p>
                          We highly appriciate your interest but you cannot join
                          as a blood donar
                        </p>
                        <small>
                          Please feel free to post in our Blood Post Box if you
                          need blood
                        </small>
                      </Fragment>
                    )}
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

MyProfile.propTypes = {
  getMyProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});
export default connect(mapStateToProps, { getMyProfile })(MyProfile);
