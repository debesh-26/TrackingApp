const redis = require('../config/redis');

module.exports = {
  async setUserLocation(userId, location) {
    await redis.set(`user:${userId}:location`, JSON.stringify(location));
  },

  async getUserLocation(userId) {
    const location = await redis.get(`user:${userId}:location`);
    return JSON.parse(location);
  },
};