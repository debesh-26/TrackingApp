const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  userId: String,
  timestamp: Date,
  coordinates: {
    lat: Number,
    lon: Number,
  },
});

module.exports = mongoose.model('Location', locationSchema);
