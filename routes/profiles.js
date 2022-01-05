var router = require('express').Router();
var profilesCtrl = require('../controllers/profiles');

router.get('/index', isLoggedIn, profilesCtrl.index)

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/auth/google");
}

module.exports = router;