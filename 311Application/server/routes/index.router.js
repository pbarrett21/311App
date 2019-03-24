const express = require('express');
const router = express.Router();

// Configuring routing for user registration.
const ctrlUser = require('../controllers/user.controller');

//Post Request from /api/register
router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);

module.exports = router;