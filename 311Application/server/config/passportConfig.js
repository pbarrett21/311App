const passport = require('passport');
const localStategy = require('passport-local').Strategy;
const mongoose = require('mongoose');


var User = mongoose.model('users');

passport.use(
    new localStategy({ usernameField: 'email'},
        (usernameField,password, done) => {
            User.findOne({email: username},
                (err, user) => {
                    if(err)
                        return done(err);
                    // unknown user
                    else if (!user)
                        return done(null, false, { message: 'Email is not registered'});
                    else if(!user.verifyPassword(password))
                        return done(null, false, { message: 'Wrong Password'});
                    else
                        return done(null, user);
                });
        })  
);