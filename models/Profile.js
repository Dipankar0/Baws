const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  profession: {
    type: String
  },
  bio: {
    type: String
  },
  facebook: {
    type: String
  },
  bloodGroup: {
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
  donateDate: {
    type: String
  },
  can: {
    type: String
  },
  permission: {
    type: String
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
