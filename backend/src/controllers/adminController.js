const User = require('../models/User');
const Location = require('../models/Location');

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving users.' });
    }
  },

  async getUserLocations(req, res) {
    const { userId } = req.params;
    try {
      const locations = await Location.find({ userId }).sort({ timestamp: -1 });
      res.json(locations);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving location logs.' });
    }
  },
};