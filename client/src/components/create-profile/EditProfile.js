import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrentProfileById, createProfile } from '../../actions/profile';

const initialState = {
  email: '',
  profession: '',
  bloodGroup: '',
  donateDate: '',
  facebook: '',
  bio: '',
  can: '',
  phone: '',
  area: '',
  thana: '',
  permission: ''
};

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfileById,
  history
}) => {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (!profile) getCurrentProfileById();
    if (!loading) {
      const profileData = { ...initialState };
      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key];
      }
      setFormData(profileData);
    }
  }, [loading, getCurrentProfileById, profile]);

  const {
    email,
    profession,
    bloodGroup,
    donateDate,
    facebook,
    bio,
    can,
    phone,
    area,
    thana
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history, true);
  };
  return (
    <Fragment>
      <div className='container'>
        <h1 className='large text-primary'>Edit Your Profile</h1>
        <p className='lead'>
          <i className='fas fa-user' /> Edit profile if anything has changed
        </p>
        <small>* = required field</small>
        <form className='form' onSubmit={e => onSubmit(e)}>
          <div className='form-group'>
            <input
              type='number'
              placeholder='* Mobile Number'
              name='phone'
              value={phone}
              onChange={e => onChange(e)}
            />
            <small className='form-text'>
              Mobile Number will be used for login
            </small>
          </div>
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
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Your Profession'
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
              placeholder='Facebook Link'
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
            <select name='can' value={can} onChange={e => onChange(e)}>
              <option value='0'>* Select Availability Status</option>
              <option value='yes'>Yes</option>
              <option value='no'>No</option>
            </select>
            <small className='form-text'>
              Tell us if are able to donate blood
            </small>
          </div>
          <div>
            <h3>Your Address</h3>
            <div className='form-group'>
              <input
                type='text'
                placeholder='* Current Address'
                name='area'
                value={area}
                onChange={e => onChange(e)}
              />
              <small className='form-text'>
                Eg: 12-10, House: 8, Road: 12, Taltola
              </small>
            </div>
            <div className='form-group'>
              <select name='thana' value={thana} onChange={e => onChange(e)}>
                <option value='0'>* Thana</option>
                <option value='Adabar'>Adabar</option>
                <option value='Azampur'>Azampur</option>
                <option value='Badda'>Badda</option>
                <option value='Bangsal'>Bangsal</option>
                <option value='Bimanbandar'>Bimanbandar</option>
                <option value='Cantonment'>Cantonment</option>
                <option value='Chowkbazar'>Chowkbazar</option>
                <option value='Darus Salam'>Darus Salam</option>
                <option value='Demra'>Demra</option>
                <option value='Dhanmondi'>Dhanmondi</option>
                <option value='Gendaria'>Gendaria</option>
                <option value='Gulshan'>Gulshan</option>
                <option value='Hazaribagh'>Hazaribagh</option>
                <option value='Kadamtali'>Kadamtali</option>
                <option value='Kafrul'>Kafrul</option>
                <option value='Kalabagan'>Kalabagan</option>
                <option value='Kamrangirchar'>Kamrangirchar</option>
                <option value='Khilgaon'>Khilgaon</option>
                <option value='Khilkhet'>Khilkhet</option>
                <option value='Kotwali'>Kotwali</option>
                <option value='Lalbagh'>Lalbagh</option>
                <option value='Mirpur Model'>Mirpur Model</option>
                <option value='Mohammadpur'>Mohammadpur</option>
                <option value='Motijheel'>Motijheel</option>
                <option value='New Market'>New Market</option>
                <option value='Pallabi'>Pallabi</option>
                <option value='Paltan'>Paltan</option>
                <option value='Panthapath'>Panthapath</option>
                <option value='Ramna'>Ramna</option>
                <option value='Rampura'>Rampura</option>
                <option value='Sabujbagh'>Sabujbagh</option>
                <option value='Shah Ali'>Shah Ali</option>
                <option value='Shahbag'>Shahbag</option>
                <option value='Sher-e-Bangla Nagar'>Sher-e-Bangla Nagar</option>
                <option value='Shyampur'>Shyampur</option>
                <option value='Sutrapur'>Sutrapur</option>
                <option value='Tejgaon Industrial Area'>
                  Tejgaon Industrial Area
                </option>
                <option value='Tejgaon'>Tejgaon</option>
                <option value='Turag'>Turag</option>
                <option value='Uttar Khan'>Uttar Khan</option>
                <option value='Uttara'>Uttara</option>
                <option value='Vatara'>Vatara</option>
                <option value='Wari'>Wari</option>
              </select>
              <small className='form-text'>Please select correctly</small>
            </div>
          </div>
          <input type='submit' className='btn btn-primary my-1' />
          <Link className='btn btn-light my-1' to='/profile/me'>
            Go Back
          </Link>
        </form>
      </div>
    </Fragment>
  );
};

EditProfile.propTypes = {
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
})(withRouter(EditProfile));
