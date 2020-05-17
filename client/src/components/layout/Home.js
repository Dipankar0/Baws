import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Jumbotron,
  Image,
  Card,
  Button,
  Container,
  Row,
  Col
} from 'react-bootstrap';

const Home = props => {
  return (
    <Fragment>
      <div className='landing'>
        <Jumbotron className='homeJumbo'>
          <div>
            <p className='welcome text-deep large'>
              <i className='fas fa-smile'></i> আসুন একটি জীবন বাচাই
            </p>
          </div>
        </Jumbotron>

        <div className='home-nav'>
          <div>
            <div className='home-nav-1 badge-firm m-1'>
              <div>
                <p className='text-white mid'>আমার রক্তের প্রয়োজন</p>
              </div>
              <div className='buttons'>
                <Link to='/newApplication' className='btn btn-primary'>
                  Application
                </Link>
                <Link to='/needer' className='btn btn-light'>
                  Login
                </Link>
              </div>
            </div>
            <div>
              <p className='text-deep'>
                কিভাবে রক্ত পাব? <Link to='/howtoget'>Click Here</Link>
              </p>
            </div>
          </div>
          <div>
            <div className='home-nav-1 badge-red m-1'>
              <div>
                <p className='text-white mid'>অমি রক্ত দিতে চাই</p>
              </div>
              <div className='buttons'>
                <Link to='/register' className='btn btn-primary'>
                  Sign Up
                </Link>
                <Link to='/login' className='btn btn-light'>
                  Login
                </Link>
              </div>
            </div>
            <div>
              <p className='text-deep'>
                কিভাবে রক্ত দিব? <Link to='howtodonate'>Click Here</Link>
              </p>
            </div>
          </div>
        </div>
        <div>
          <p className='non-profit text-deep'>
            We are a non-profitable organisation to serve human kind
          </p>
        </div>
      </div>
    </Fragment>
  );
};

Home.propTypes = {};

export default Home;
