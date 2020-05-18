import React from 'react';
import PropTypes from 'prop-types';

const NoApplication = props => {
  return (
    <div className='container badge-light'>
      <p className='mid text-deep'>Blood Source এ আপনাকে স্বাগতম।</p> <br />
      <br />
      <p className='lead text-deep'>
        এই মুহূর্তে আমরা রক্ত দাতা (Donor) সংগ্রহ করতে নিয়োজিত আপনাদের জন্যে।
        আমরা চাই একজন মানুষও যেন আমাদের সহযোগিতা থেকে বঞ্চিত না হয়, তাই আমাদের
        এই বিড়ম্বনা। <br />
        <br />
        আমরা দুঃখিত বর্তমানে আপনাকে সহযোগিতা করতে না পেরে। <br />
        শুভ হক আপনার রক্ত সংগ্রহ।{' '}
      </p>
    </div>
  );
};

NoApplication.propTypes = {};

export default NoApplication;
