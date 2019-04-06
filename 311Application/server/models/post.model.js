const mongoose = require('mongoose');

//Post Schema. This is going to be everything that the post has.
var postSchema = new mongoose.Schema({
    userId: String,
    postTitle: String,
    postText: String,
    postLocation: String,
    postTime: String
});

mongoose.model('Post', postSchema);
