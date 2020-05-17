import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
//style={{ color: 'red' }}
const DonarAbout = ({
  profile: {
    bloodGroup,
    donateDate,
    facebook,
    can,
    area,
    thana,
    user: { name, phone }
  }
}) => {
  return (
    <Fragment>
      {' '}
      <div className='profile-top bg-red p-2'>
        <div>
          <p>
            <span className='large'>
              <i class='fas fa-user-nurse'></i> {name}
            </span>
          </p>
        </div>
        <br />
        <p className='lead'>
          <span>Blood Group:</span> <span>{bloodGroup}</span>
        </p>
        <p className='lead'>
          <span>Mobile Number:</span> <span>{phone}</span>
        </p>
        <p className='lead'>
          <span>Last Donate Time: </span> <span>{donateDate}</span>
        </p>
        <p className='lead'>
          <span>Available:</span> <span>{can}</span>
        </p>
        <p className='lead'>
          <span>Address:</span> <span>{thana} - </span>
          <span>{area}</span>
        </p>
      </div>
    </Fragment>
  );
};

DonarAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default DonarAbout;
