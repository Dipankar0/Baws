import React from 'react';
import PropTypes from 'prop-types';

const CustomerAbout = ({
  customer: {
    profession,
    bio,
    donateDate,
    can,
    facebook,
    bloodGroup,
    email,
    area,
    thana,
    user: { phone, name }
  }
}) => {
  return (
    <div className='profile-top bg-primary p-2'>
      <div>
        <p>
          <span className='large'> {name}</span>{' '}
          <span>
            <a href={facebook} target='_blank' rel='noopener noreferrer'>
              <i className='fab fa-facebook fa-2x' />
            </a>
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
        <span>Email:</span> <span>{email}</span>
      </p>
      <p className='lead'>
        <span>Profession:</span> <span>{profession}</span>
      </p>
      <p className='lead'>
        <span>Bio:</span> <span>{bio}</span>
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
  );
};

CustomerAbout.propTypes = {
  customer: PropTypes.object.isRequired
};

export default CustomerAbout;
