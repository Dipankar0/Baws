import React, { useEffect, useState, Fragment } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfileById } from '../../actions/profile';

const CreateProfile = ({
  createProfile,
  getCurrentProfileById,
  profile: { profile, loading },
  history
}) => {
  const [formData, setFormData] = useState({
    email: '',
    profession: '',
    bloodGroup: '',
    donateDate: '',
    facebook: '',
    bio: '',
    can: ''
  });

  const {
    email,
    profession,
    bloodGroup,
    donateDate,
    facebook,
    bio,
    can
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history);
  };

  useEffect(() => {
    getCurrentProfileById();
  }, [getCurrentProfileById]);

  return loading && profile == null ? (
    <Redirect to='/profile/me' />
  ) : (
    <Fragment>
      <div className='container'>
        <h1 className='large text-primary'>Create Your Profile</h1>
        <p className='lead'>
          <i className='fas fa-user' /> Lets get to know you
        </p>
        <small>* = required field</small>
        <form className='form' onSubmit={e => onSubmit(e)}>
          <div className='form-group'>
            <select
              name='bloodGroup'
              value={bloodGroup}
              onChange={e => onChange(e)}
            >
              <option value='0'>* Select Blood Group</option>
              <option value='A+'>A+</option>
              <option value='A-'>A-</option>
              <option value='B+'>B+</option>
              <option value='B-'>B-</option>
              <option value='O+'>O+</option>
              <option value='O-'>O-</option>
              <option value='AB+'>AB+</option>
              <option value='AB-'>AB-</option>
            </select>
            <small className='form-text'>Please select correctly</small>
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Email'
              name='email'
              value={email}
              onChange={e => onChange(e)}
            />
            <small className='form-text'>
              Email will be required later if you forget password
            </small>
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='* Your Profession'
              name='profession'
              value={profession}
              onChange={e => onChange(e)}
            />
            <small className='form-text'>
              Please provide your current occupation
            </small>
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='* Facebook Link'
              name='facebook'
              value={facebook}
              onChange={e => onChange(e)}
            />
            <small className='form-text'>Your Facebook Link</small>
          </div>
          <div className='form-group'>
            <textarea
              placeholder='A short bio of yourself'
              name='bio'
              value={bio}
              onChange={e => onChange(e)}
            />
            <small className='form-text'>Tell us a little about yourself</small>
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='* Last Blood Donate Time'
              name='donateDate'
              value={donateDate}
              onChange={e => onChange(e)}
            />
            <small className='form-text'>
              If never donated yet put "Never"
            </small>
          </div>
          <div className='form-group'>
            <select name='can' onChange={e => onChange(e)}>
              <option value='0'>* Select Availability Status</option>
              <option value='yes'>Yes</option>
              <option value='no'>No</option>
            </select>
            <small className='form-text'>
              Tell us if are able to donate blood
            </small>
          </div>

          <input type='submit' className='btn btn-primary my-1' />
          <Link className='btn btn-light my-1' to='/dashboard'>
            Go Back
          </Link>
        </form>
      </div>
    </Fragment>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile
});
export default connect(mapStateToProps, {
  createProfile,
  getCurrentProfileById
})(withRouter(CreateProfile));
