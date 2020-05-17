import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import logo from '../../img/logo.jpeg';

const Navbar = ({
  auth: { isAuthenticated, loading, needer, user },
  logout
}) => {
  const authLinks = (
    <nav className='navbar bg-deep'>
      <div>
        <img
          src={logo}
          style={{
            width: '40px',
            height: '25px',
            marginTop: '6px',
            display: 'block',
            border: '1px solid'
          }}
          alt=''
          rounded
        />
        <p className='mid'>
          <Link to='/posts'>Blood Source</Link>
        </p>
      </div>
      <ul>
        <li>
          {needer && needer !== null && user === null ? (
            <Link to='/posts/myPost'>Dashboard</Link>
          ) : (
            <Link to='/myDashBoard'>Dashboard</Link>
          )}
        </li>
        <li>
          {needer && needer !== null && user === null ? (
            <Link to='/addApplication'>New</Link>
          ) : (
            <Link to='/profile/me'>My Profile</Link>
          )}
        </li>
        <li>
          <a onClick={logout} href=''>
            <span className='hide-sm'>Logout</span>
          </a>
        </li>
      </ul>
    </nav>
  );

  const guestLinks = (
    <nav className='navbar bg-deep'>
      <div>
        <img
          src={logo}
          style={{
            width: '40px',
            height: '25px',
            marginTop: '6px',
            display: 'block',
            border: '1px solid'
          }}
          alt=''
          rounded
        />
        <p className='mid'>
          <Link to='/'>Blood Source</Link>
        </p>
      </div>
      <ul>
        <li>
          <Link to='/posts'>Applications</Link>
        </li>
        <li>
          <Link to='/needer'>Needer</Link>
        </li>
        <li>
          <Link to='/login'>Donor</Link>
        </li>
      </ul>
    </nav>
  );

  return (
    <Fragment>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </Fragment>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
