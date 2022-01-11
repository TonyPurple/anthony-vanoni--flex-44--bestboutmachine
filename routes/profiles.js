var router = require('express').Router();
var profilesCtrl = require('../controllers/profiles');

//show all users
router.get('/', isLoggedIn, profilesCtrl.index);
//show individual profile page
router.get('/:id', isLoggedIn, profilesCtrl.show);
//delete match from bestBoutList
router.delete('/boutList/:id', isLoggedIn, profilesCtrl.deleteBout)
    // handle new profile form being submitted
    // router.post('/profiles/:id/bio', isLoggedIn, profilesCtrl.createBio);
    // router.post('/:id', isLoggedIn, profilesCtrl.createBio)
    // router.get("/:id", isLoggedIn, profilesCtrl.edit)
router.put('/:id', isLoggedIn, profilesCtrl.update)
    //follow a profile i.e add them to your faction
router.patch("/:id/faction", isLoggedIn, profilesCtrl.follow)
    // stop following a profile i.e. turn heel
router.patch("/:id/heelTurn", isLoggedIn, profilesCtrl.unfollow)

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/auth/google");
}

module.exports = router;