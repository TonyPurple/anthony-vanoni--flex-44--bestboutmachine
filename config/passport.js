const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const User = require('../models/user');
const Profile = require('../models/profile');

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK
    },
    function(accessToken, refreshToken, profile, done) {
        User.findOne({ googleId: profile.id }, function(err, user) {
            if (err) return done(err)
            if (user) {
                return done(null, user)
            } else {
                const newProfile = new Profile({
                    name: profile.displayName,
                    avatar: profile.photos[0].value,
                })
                const newUser = new User({
                    email: profile.emails[0].value,
                    googleId: profile.id,
                    profile: newProfile._id
                })
                newProfile.save(function(err) {
                    if (err) return done(err)
                })
                newUser.save(function(err) {
                    if (err) {
                        // Something went wrong while making a user - delete the profile
                        Profile.findByIdAndDelete(newProfile._id)
                        return done(err)
                    }
                    return done(null, newUser)
                })
            }
        })
    }
))

passport.serializeUser(function(user, done) {
    done(null, user.id)
})

passport.deserializeUser(function(id, done) {
    User.findById(id)
        .populate('profile', 'name avatar')
        .exec(function(err, user) {
            done(err, user)
        })
})