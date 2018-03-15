const mongoose = require('mongoose');

const ItemScemha = mongoose.Schema({
  make: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: Number,
    required: true
  },
  quanity: {
    type: Number,
    default: 0
  },
  deal: {
    type: Boolean,
    default: false
  },
  image: {
    type: String,
    default: ""
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }

});

module.exports = mongoose.model("Item", ItemScemha);