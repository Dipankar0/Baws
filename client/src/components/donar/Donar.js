import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getDonarById } from '../../actions/profile';
import DonarAbout from './DonarAbout';
import Spinner from '../layout/Spinner';

const Donar = ({
  getDonarById,
  profile: { profile },
  auth: { isAuthenticated, needer },
  match
}) => {
  useEffect(() => {
    getDonarById(match.params.id);
  }, [getDonarById, match.params.id]);

  return (
    <Fragment>
      <div className='container'>
        {!profile || profile === null ? (
          <Fragment>
            <Spinner />
          </Fragment>
        ) : (
          <Fragment>
            {isAuthenticated &&
            needer !== null &&
            profile !== null &&
            profile._id === match.params.id ? (
              <Fragment>
                {' '}
                <div className='welcome'>
                  <p className='text-deep mid my-1'>
                    <i class='fas fa-smile'></i> Hi {needer.name}
                  </p>
                  <p className='text-deep mid my-1'>
                    <i class='fas fa-heart'></i> Welcome to My Profile
                  </p>
                  <p className='text-deep lead my-1'>
                    <i class='fas fa-hand-peace'></i> Please contact with me
                  </p>
                </div>
                <DonarAbout profile={profile} />
              </Fragment>
            ) : (
              <Fragment>
                <Spinner />
              </Fragment>
            )}
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

Donar.propTypes = {
  getDonarById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getDonarById })(Donar);
