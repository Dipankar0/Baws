import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike } from '../../actions/post';

const PostItem = ({
  auth: { isAuthenticated },
  post: { _id, text, comments, date, needer, bloodGroup, thana },
  showActions
}) => {
  return (
    <Fragment>
      {isAuthenticated ? (
        <Fragment>
          <div className='posts bg-firm my-3'>
            <p className='lead my-1'>
              <i class='fas fa-portrait' /> {needer.name}
            </p>
            <p className='lead my-1'>
              <i class='fas fa-tint' /> {bloodGroup}
            </p>
            <p className='lead my-1'>
              <i class='fas fa-map-marker-alt'></i> {thana}
            </p>
            <p className='my-1'>{text}</p>
            <p className='post-date'>
              Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
            </p>
            {showActions && (
              <Fragment>
                <Link to={`/posts/postId/${_id}`} className='btn btn-danger'>
                  Discussion{' '}
                  {comments.length > 0 && (
                    <span className='comment-count'>{comments.length}</span>
                  )}
                </Link>
              </Fragment>
            )}
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <div className='posts bg-firm my-3'>
            <p className='lead my-1'>
              <i class='fas fa-portrait' /> {needer.name}
            </p>
            <p className='lead my-1'>
              <i class='fas fa-tint' /> {bloodGroup}
            </p>
            <p className='lead my-1'>
              <i class='fas fa-map-marker-alt'></i> {thana}
            </p>
            <p className='my-1'>{text}</p>
            <p className='post-date'>
              Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
            </p>
            {showActions && (
              <Fragment>
                <Link to={`/posts/postId/${_id}`} className='btn btn-danger'>
                  Discussion{' '}
                  {comments.length > 0 && (
                    <span className='comment-count'>{comments.length}</span>
                  )}
                </Link>
              </Fragment>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  addLike: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  showActions: PropTypes.bool
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { addLike })(PostItem);
