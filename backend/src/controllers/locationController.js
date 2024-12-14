const Location = require('../models/Location');
const redisService = require('../services/redisService');

module.exports = {
  async updateLocation(req, res) {
    const { lat, lon } = req.body;
    if (!lat || !lon) {
      return res.status(400).json({ message: 'Latitude and longitude are required.' });
    }

    const location = {
      userId: req.userId,
      timestamp: new Date(),
      coordinates: { lat, lon },
    };

    try {
      const newLocation = new Location(location);
      await newLocation.save();
      await redisService.setUserLocation(req.userId, location);
      res.status(200).json({ message: 'Location updated successfully.' });
    } catch (error) {
      res.status(500).json({ message: 'Error saving location.' });
    }
  },
};