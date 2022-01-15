const router = require('express').Router();
const passport = require('passport');

// Google OAuth login route
router.get(
    '/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
)

// Google OAuth callback route
router.get(
    '/google/oauth2callback',
    passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/auth/google',
    })
)

// OAuth logout route
router.get('/logout', function(req, res) {
    req.logout()
    res.redirect('/')
})

module.exports = router