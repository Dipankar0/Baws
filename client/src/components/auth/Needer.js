import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { neederLogin } from '../../actions/auth';

const Needer = ({ neederLogin, isAuthenticated }) => {
  const [formDate, setFormData] = useState({
    phone: '',
    password: ''
  });

  const { phone, password } = formDate;

  const onChange = e =>
    setFormData({
      ...formDate,
      phone: e.target.value,
      password: e.target.value
    });

  const onSubmit = async e => {
    e.preventDefault();
    neederLogin(phone, password);
  };

  //Redirect
  if (isAuthenticated) {
    return <Redirect to='/posts/myPost' />;
  }

  return (
    <Fragment>
      <div className='container'>
        <p className='welcome large text-deep my-1'>
          <i class='fas fa-smile'></i> আপনাকে স্বাগতম
        </p>
        <p className='lead text-deep my-1'>
          <i className='fas fa-user'></i> অ্যাপ্লিকেশন পূরণ করার সময় যেই মোবাইল
          নাম্বারটি দিয়েছেন তা প্রবেশ করুন
        </p>
        <form className='form' onSubmit={e => onSubmit(e)}>
          <div className='form-group'>
            <input
              type='number'
              placeholder='মোবাইল নাম্বার'
              name='phone'
              value={phone}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <input type='submit' className='btn btn-danger' value='Login' />
        </form>
        <p className='my-1'>
          আপনি প্রথমবার রক্ত গ্রহীতা হলে{' '}
          <Link className='text-red' to='/newApplication'>
            New Application
          </Link>
        </p>
      </div>
    </Fragment>
  );
};

Needer.propTypes = {
  neederLogin: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { neederLogin })(Needer);
