const mongoose = require('mongoose');

const DealSchema = mongoose.Schema({
  itemId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'item',
    required: true
  },
  percent: {
    type: Number,
    default: 0
  },
  custom: {
    type: String,
    default: null
  }
});

module.exports = mongoose.model("Deal", DealSchema);