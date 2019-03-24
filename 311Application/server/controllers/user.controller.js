const mongoose = require('mongoose');
const passport = require('passport')

const User = mongoose.model('users')

module.exports.register = (req, res, next) =>{
        var user = new User();
        user.fullName = req.body.fullName;
        user.email = req.body.email;
        user.password = req.body.password;
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

module.exports.authenticate = (req, res, next) => {
    //Call for passport authentication
    passport.authenticate('local', (err, user, info) => {
        // error from passport middleware
        if(err) return resizeTo.status(400).json(err);
        // register user
        else if (user) return res.status(200).json({"token": user.generateJwt()});
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}