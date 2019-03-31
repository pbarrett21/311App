const express = require('express');
const router = express.Router();

// Configuring routing for user registration.
const ctrlUser = require('../controllers/user.controller');

// Configuring routing for authentication
const jwtHelper = require('../config/jwtHelper');

//Post Request from /api/register
router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.get('/userProfile', jwtHelper.verifyJwtToken, ctrlUser.userProfile);

module.exports = router;