import React from 'react';
import PropTypes from 'prop-types';

const NoApplication = props => {
  return (
    <div className='container badge-light'>
      <p className='mid text-deep'>Blood Source এ আপনাকে স্বাগতম।</p> <br />
      <br />
      <p className='lead text-deep'>
        এই মুহূর্তে আমরা রক্ত দাতা (Donor) সংগ্রহ করতে নিয়জিত আপনাদের জন্যে।
        আমরা চাই একজন মানুষ ও জেন আমদের সুবিদা থেকে বঞ্চিত না হয় তাই আমদের এই
        বিড়ম্বনা। <br />
        <br />
        আমরা দুঃখিত আপনাকে বর্তমানে সহযোগিতা করতে না পেরে। <br />
        শুভ হক আপনার রক্ত সংগ্রহ।{' '}
      </p>
    </div>
  );
};

NoApplication.propTypes = {};

export default NoApplication;
