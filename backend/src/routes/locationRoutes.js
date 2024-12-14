const express = require('express');
const locationController = require('../controllers/locationController');
const authenticate = require('../middleware/authenticate');
const router = express.Router();

router.post('/', authenticate, locationController.updateLocation);

module.exports = router;