const express = require('express');
const router = express.Router();

// Configuring routing for user registration.
const ctrlUser = require('../controllers/user.controller');
const ctrlPost = require('../controllers/post.controller');



// Configuring routing for authentication
const jwtHelper = require('../config/jwtHelper');

//Post Request from /api/register
router.post('/register', ctrlUser.register);

//Post request for authenticating, i.e logging in.
router.post('/authenticate', ctrlUser.authenticate);

//Get Request for user profile
router.get('/userProfile', jwtHelper.verifyJwtToken, ctrlUser.userProfile);

//Post Request for Posting a new post
router.post('/newPost', ctrlPost.post);
router.post('/deletePost', jwtHelper.verifyJwtToken, ctrlPost.deletePost);

/**
*   Warning to anyone who touches this:
*       If you try to access req._id to get the user token and it is undefined
*       check to see if you call jwtHelper.verifyJwtToken on the route. Don't be like me....
**/

//Get Request for getting alll posts that pertain to a certin zip code
router.get('/postDashboard', jwtHelper.verifyJwtToken, ctrlPost.postDashboard)

module.exports = router;