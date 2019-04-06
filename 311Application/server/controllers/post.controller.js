const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

const Post = mongoose.model('Post');

module.exports.post = (req, res, next) =>{
        var post = new Post();
        post.userId = req.User._id;
        post.postTitle = req.body.postTitle;
        post.postText = req.body.postText;
        post.postLocation = req.body.zipCode;
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
    Post.find
}

// module.exports.userProfile = (req, res, next) => {
//     User.findOne({ _id: req._id},
//         (err, user) => {
//             if(!user){
//                 return res.status(404).json({ status: false, message: 'User record not found.'});
//             }
//             else{
//                 return res.status(200).json({status: true, user : _.pick(user, ['fullName', 'email']) });
//             }
//         });
// }