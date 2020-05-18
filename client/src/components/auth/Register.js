import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';

const Register = ({ setAlert, register, isAuthenticated, history }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    password2: '',
    bloodGroup: '',
    area: '',
    thana: ''
  });

  const {
    name,
    phone,
    email,
    bloodGroup,
    area,
    thana,
    password,
    password2
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({
        name,
        phone,
        email,
        bloodGroup,
        area,
        thana,
        password,
        history
      });
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/profile/me' />;
  }

  return (
    <Fragment>
      <div className='container'>
        <h1 className='large text-red'>
          Sign Up For Donor <i class='fas fa-user-nurse'></i>{' '}
        </h1>
        <p className='lead'>
          <i className='fas fa-user'></i> আমাদের সম্মানিত সদস্য হতে এখনি একাউন্ট
          খুলুন
        </p>
        <p className='lead'>'*’ = অত্যাবশ্যকীয়</p>
        <form className='form' onSubmit={e => onSubmit(e)}>
          <div className='form-group'>
            <input
              type='text'
              placeholder='* নাম'
              name='name'
              value={name}
              onChange={e => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <input
              type='number'
              placeholder='* মোবাইল নাম্বার'
              name='phone'
              value={phone}
              onChange={e => onChange(e)}
            />
            <small className='form-text'>এটা আপনার Id হিসেবে ব্যবহৃত হবে</small>
          </div>
          <div className='form-group'>
            <input
              type='email'
              placeholder='email@gmail.com'
              name='email'
              value={email}
              onChange={e => onChange(e)}
            />
            <small className='form-text'>
              আপনি পাসওয়ার্ড ভুলে গেলে ইমেইল ব্যবহার করে পুরনরায় পাসওয়ার্ড তৈরি
              করতে পারবেন
            </small>
          </div>
          <div className='form-group'>
            <select
              name='bloodGroup'
              value={bloodGroup}
              onChange={e => onChange(e)}
            >
              <option value='0'>* রক্তের গ্রুপ বাছাই করুন</option>
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
              type='password'
              placeholder='* পাসওয়ার্ড'
              name='password'
              value={password}
              onChange={e => onChange(e)}
            />
            <small className='form-text'>
              কমপক্ষে ৬ টি অক্ষর/ সংখ্যা/সাংকেতিক চিহ্ন থাকবে
            </small>
          </div>
          <div className='form-group'>
            <input
              type='password'
              placeholder='* কনফার্ম পাসওয়ার্ড'
              name='password2'
              value={password2}
              onChange={e => onChange(e)}
            />
          </div>
          <div>
            <h3>Your Address</h3>
            <div className='form-group'>
              <input
                type='text'
                placeholder='* আপনার বর্তমান ঠিকানা'
                name='area'
                value={area}
                onChange={e => onChange(e)}
              />
              <small className='form-text'>
                যেমনঃ বাড়ি-১০, রোড-১২, ব্লক-৮ ইত্যাদি
              </small>
            </div>
            <div className='form-group'>
              <select name='thana' value={thana} onChange={e => onChange(e)}>
                <option value='0'>* Select</option>
                <option value='Gopalganj'>Gopalganj</option>
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
              <small className='form-text'>আপনার স্থান সনাক্ত করুন</small>
            </div>
            <div>
              <small className='form-text'>
                By clicking Register, you agree to our{' '}
                <Link to='/termsandconditions'>Terms</Link>,{' '}
                <Link to='/termsandconditions'>Data Policy</Link> and
                <Link to='/termsandconditions'> Cookie</Link> Policy. You may
                receive SMS notifications from us and can opt out at any time.
              </small>
            </div>
          </div>
          <input type='submit' className='btn btn-danger' value='Register' />
        </form>
        <p className='my-1'>
          Already have an account?{' '}
          <Link to='/login' className='text-red'>
            Sign In
          </Link>
        </p>
      </div>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);
