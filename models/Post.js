const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  needer: {
    type: Schema.Types.ObjectId,
    ref: 'needer'
  },
  text: {
    type: String,
    required: true
  },
  bloodGroup: {
    type: String,
    required: true
  },
  clinicName: {
    type: String,
    required: true
  },
  area: {
    type: String,
    required: true
  },
  thana: {
    type: String,
    required: true
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
      }
    }
  ],
  comments: [
    {
      text: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      donar: {
        type: Schema.Types.ObjectId,
        ref: 'user'
      },
      commentDate: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Post = mongoose.model('post', PostSchema);
