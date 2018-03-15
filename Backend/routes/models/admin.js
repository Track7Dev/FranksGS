const mongoose = require('mongoose');
const AdminSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  hash: {
    type: String,
    required: true
  },
  name:{
    type:String,
    required: true
  },
  tKey: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Admin', AdminSchema);