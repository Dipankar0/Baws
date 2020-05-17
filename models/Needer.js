const mongoose = require('mongoose');

const NeederSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  }
});

module.exports = Needer = mongoose.model('needer', NeederSchema);
