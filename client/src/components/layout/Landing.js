import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import img from '../../img/landing.jpeg';
import { Image, Card } from 'react-bootstrap';

const Landing = ({ auth: { isAuthenticated } }) => {
  return (
    <div className=''>
      <div>
        <Image className='landing-image' src={img} />
      </div>
      <div className='badge-white' style={{ margin: '0px' }}>
        <p className='welcome text-deep large'>
          <i class='fas fa-smile'></i> We are proud to share blood
        </p>
      </div>
      {!isAuthenticated && (
        <Fragment>
          <div className='landing-navs'>
            <Card style={{ backgroundColor: '#2471a3' }}>
              <Card.Body>
                <Card.Title
                  className='text-deep large'
                  style={{
                    textAlign: 'center',
                    fontSize: '2em',
                    color: 'white'
                  }}
                >
                  <i class='fas fa-hand-holding-medical'></i> I Need Blood
                </Card.Title>
                <div className='landing-nav-buttons'>
                  <Link to='/newApplication' className='btn-light'>
                    New Application
                  </Link>
                  <Link to='/needer' className='btn-light'>
                    Login
                  </Link>
                </div>
              </Card.Body>
            </Card>
            <Card style={{ backgroundColor: '#fb0444' }}>
              <Card.Body>
                <Card.Title
                  className='text-deep mid'
                  style={{
                    textAlign: 'center',
                    fontSize: '2em',
                    color: 'white'
                  }}
                >
                  <i class='fas fa-user-nurse'></i> I Donate Blood
                </Card.Title>
                <div className='landing-nav-buttons'>
                  <Link to='/register' className='btn-light'>
                    Sign Up
                  </Link>
                  <Link to='/login' className='btn-light'>
                    Login
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </div>
        </Fragment>
      )}
    </div>
  );
};

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
