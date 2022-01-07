var router = require('express').Router();
var matchesCtrl = require('../controllers/matches');

router.get('/', isLoggedIn, matchesCtrl.index);
router.get('/new', isLoggedIn, matchesCtrl.new);
router.get('/:id', isLoggedIn, matchesCtrl.show);
router.post('/', isLoggedIn, matchesCtrl.create);
// push match to profile
router.get('/:id/profiles/', isLoggedIn, matchesCtrl.bestBout)
router.delete('/:id', isLoggedIn, matchesCtrl.delete);

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/auth/google");
}

module.exports = router;