const express = require('express');
const adminController = require('../controllers/adminController');
const router = express.Router();

router.get('/users', adminController.getUsers);
router.get('/users/:userId/locations', adminController.getUserLocations);

module.exports = router;