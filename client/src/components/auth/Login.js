import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
  const [formDate, setFormData] = useState({
    phone: '',
    password: ''
  });

  const { phone, password } = formDate;

  const onChange = e =>
    setFormData({ ...formDate, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    login(phone, password);
  };

  //Redirect
  if (isAuthenticated) {
    return <Redirect to='/profile/me' />;
  }

  return (
    <Fragment>
      <div className='container'>
        <h1 className='large text-red'>
          Log In As Donor <i class='fas fa-user-nurse'></i>{' '}
        </h1>
        <p className='lead'>
          <i className='fas fa-user'></i> Log Into Your Account
        </p>
        <form className='form' onSubmit={e => onSubmit(e)}>
          <div className='form-group'>
            <input
              type='number'
              placeholder='Mobile Number'
              name='phone'
              value={phone}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              placeholder='Password'
              name='password'
              minLength='6'
              value={password}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <input type='submit' className='btn btn-danger' value='Login' />
        </form>
        <p className='my-1'>
          Don't have an account?{' '}
          <Link to='/register' className='text-red'>
            Sign Up
          </Link>
        </p>
      </div>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
