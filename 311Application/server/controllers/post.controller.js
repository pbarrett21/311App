const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

const Post = mongoose.model('Post');
const User = mongoose.model('User');

module.exports.post = (req, res, next) =>{
        var post = new Post();
       // post.userId = req.User._id;
        post.postTitle = req.body.postTitle;
        post.postText = req.body.postText;
        post.postLocation = req.body.postLocation;
        //Note for those looking at the document inside of the DB
        //Java Date returns the number of Milliseconds ellasped since Jan 1st, 1970
        //to now.
        post.postTime = Date.now();
        post.save((err, doc) =>{
            if(!err){
                res.send(doc);
            }
            else{
                return next(err);
            }
        }); 
}

module.exports.postDashboard = (req, res, next) => {
    USER = User.findOne({ _id: req._id},
        (err, user) => {
                USER = user
                if(err){
                    console.log(err)
                }
        });

    Post.find({postLocation: USER.userLocation},
        (err, post) => {
            console.log(post)
            if(!post){
                return res.status(404).json({ status: false, message: 'No Posts found...'});
            }
            else{
                return res.status(200).json({status: true, post : _.pick(post, ['postTitle', 'postText', 'postLocation']) });
            }
        });
}