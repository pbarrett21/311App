const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

const User = mongoose.model('User');

module.exports.register = (req, res, next) =>{
        var user = new User();
        user.fullName = req.body.fullName;
        user.email = req.body.email;
        user.password = req.body.password;
        user.userLocation = req.body.zipCode;

        User.find().exec(
            function(err, users) {
                if(users.length == 0) {
                    user.userType = '0';
                }
                else {
                    user.userType = '1';
                }
                user.save((err, doc) =>{
                    if(!err){
                        res.send(doc);
                    }
                    else{
                        if(err.code == 11000){
                            res.status(422).send(['Duplicate email address found.']);
                        }
                        else{
                            return next(err);
                        }
                    }
                });
            }
        )
}

module.exports.authenticate = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => {       
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (user) return res.status(200).json({ "token": user.generateJwt() });
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}

module.exports.userProfile = (req, res, next) => {
    User.findOne({ _id: req._id},
        (err, user) => {
            if(!user){
                return res.status(404).json({ status: false, message: 'User record not found.'});
            }
            else{
                return res.status(200).json({status: true, user : _.pick(user, ['fullName', 'email', 'userLocation']) });
            }
        });
}

module.exports.adminDashboard = (req, res, next) => {
    var userType;

    User.findOne({_id: req._id},
        (err, user) => {
            User.find().exec(
                function(err, users) {
                    if(!users) {
                        return res.status(404).json({ status: false, message: 'No users found...'});
                    }
                    else {
                        return res.status(200).json({status: true, users, userType: user.userType});
                    }
                }
            )
        }
        )
}

module.exports.toggleAdmin = (req, res, next) => {
    User.findOne({_id: req._id},
        (err, user) => {
            if(user.userType == 0) {
                User.findOne({_id: req.body['userId']},
                    (err, targetUser) => {
                        if(targetUser.userType == 0) {
                            User.findByIdAndUpdate({_id: req.body['userId']}, {$set:{userType:1}}).exec(
                                function(err, target) {
                                    if(!target) { return res.status(500).json({status:false}); }
                                    else { return res.status(200).json({status:true}); }
                                }
                            )
                        }
                        else {
                            User.findByIdAndUpdate({_id: req.body['userId']}, {$set:{userType:0}}).exec(
                                function(err, target) {
                                    if(!target) { return res.status(500).json({status:false}); }
                                    else { return res.status(200).json({status:true}); }
                                }
                            )
                        }
                    }
                )
            }
        }
        )
}

module.exports.deleteUser = (req, res, next) => {
    User.findOne({_id: req._id},
        (err, user) => {
            if(user.userType == 0) {
                User.findByIdAndDelete({_id: req.body['userId']}).exec(
                    function(err, targetUser) {
                        if(!targetUser) { return res.status(500).json({status:false}); }
                        else { return res.status(200).json({status:true}); }
                    }
                )
            }
        }
    )
}
