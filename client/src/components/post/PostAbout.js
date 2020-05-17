import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike } from '../../actions/post';

const PostAbout = ({
  auth: { isAuthenticated },
  addLike,
  post: {
    _id,
    text,
    comments,
    date,
    needer,
    bloodGroup,
    thana,
    clinicName,
    area
  },
  showActions
}) => {
  return (
    <Fragment>
      {isAuthenticated ? (
        <Fragment>
          <div className='post text-deep bg-white p-1 my-1'>
            <p className='lead my-1'>
              <i class='fas fa-portrait' /> {needer.name}
            </p>
            <p className='lead my-1'>
              <i class='fas fa-tint' /> {bloodGroup}
            </p>
            <p className='lead my-1'>
              <i class='fas fa-mobile-alt' /> {needer.phone}
            </p>
            <p className='my-1'>{text}</p>
            <p className='lead my-1'>
              <i class='fas fa-map-marker-alt'></i> {thana}
            </p>
            <p className='my-1'>{clinicName}</p>
            <p className='my-1'>{area}</p>
            <p className='post-date'>
              Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
            </p>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <div className='post bg-white my-1'>
            <p className='lead text-deep my-1'>
              <i class='fas fa-portrait' /> {needer.name}
            </p>
            <p className='lead my-1'>
              <i class='fas fa-tint' /> {bloodGroup}
            </p>
            <p className='my-1'>{text}</p>
            <p className='lead my-1'>
              <i class='fas fa-map-marker-alt'></i> {thana}
            </p>
            <p className='my-1'>
              <i class='fas fa-hospital'></i> <span>{clinicName} - </span>
              <span>{area}</span>
            </p>
            <p className='post-date'>
              Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
            </p>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

PostAbout.defaultProps = {
  showActions: true
};

PostAbout.propTypes = {
  addLike: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  showActions: PropTypes.bool
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { addLike })(PostAbout);
