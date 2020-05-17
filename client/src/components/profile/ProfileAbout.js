import React from 'react';
import PropTypes from 'prop-types';
import img_1 from '../../img/img_1.png';
import img_2 from '../../img/img_2.png';
//style={{ color: 'red' }}
const ProfileAbout = ({
  profile: {
    email,
    profession,
    bloodGroup,
    donateDate,
    facebook,
    bio,
    can,
    area,
    thana,
    user: { name, phone }
  }
}) => {
  return (
    <div className='profile-top bg-red'>
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
        <span>Available:</span> <span>{can}</span>
      </p>
      <p className='lead'>
        <span>Address:</span> <span>{thana} - </span>
        <span>{area}</span>
      </p>
    </div>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
