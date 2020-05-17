import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
//import { deleteComment } from '../../actions/post';

const CommentItem = ({
  post,
  comment: { text, name, donar, date },
  auth: { isAuthenticated, needer }
}) => {
  return (
    <Fragment>
      <div className='post bg-white p-1 my-1'>
        <div>
          {donar && donar !== null ? (
            <Fragment>
              {isAuthenticated &&
              needer !== null &&
              needer._id === post.needer._id ? (
                <Fragment>
                  <p className='lead my-1'>
                    <i class='fas fa-user-check' />{' '}
                    <Link to={`/profile/donorId/${donar}`}>{name}</Link>
                  </p>
                </Fragment>
              ) : (
                <Fragment>
                  <p className='lead my-1'>
                    <i class='fas fa-user-check' /> {name}
                  </p>
                </Fragment>
              )}
            </Fragment>
          ) : (
            <Fragment>
              <p className='lead my-1'>
                <i class='fas fa-portrait' /> {name}
              </p>
            </Fragment>
          )}
          <p className='my-1'>{text}</p>
          <p className='post-date'>
            Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
          </p>
        </div>
      </div>
    </Fragment>
  );
};

CommentItem.propTypes = {
  post: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(CommentItem);
