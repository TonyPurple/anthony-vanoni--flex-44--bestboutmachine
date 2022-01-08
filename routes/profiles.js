var router = require('express').Router();
var profilesCtrl = require('../controllers/profiles');

router.get('/', isLoggedIn, profilesCtrl.index);
router.get('/:id', isLoggedIn, profilesCtrl.show);
router.delete('/boutList/:id', isLoggedIn, profilesCtrl.deleteBout)
    // router.patch("/:id/faction", isLoggedIn, profilesCtrl.addFaction)

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/auth/google");
}

module.exports = router;