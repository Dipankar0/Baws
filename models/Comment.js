const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'post'
  },
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  bloodGroup: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Comment = mongoose.model('comment', CommentSchema);
