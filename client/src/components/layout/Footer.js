import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Footer = props => {
  return (
    <Fragment>
      <footer>
        <div className='social'>
          <Link to='/about' className='support'>
            About Us
          </Link>
          <a href='https://www.facebook.com/bloodsourcebd' className='tweet'>
            Contact Us
          </a>
          <a
            href='https://www.facebook.com/groups/254594659278593/?epa=SEARCH_BOX'
            className='face'
          >
            f
          </a>
        </div>
      </footer>
    </Fragment>
  );
};

Footer.propTypes = {};

export default Footer;
