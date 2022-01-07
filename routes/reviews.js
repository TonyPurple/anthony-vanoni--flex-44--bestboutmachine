var router = require('express').Router();
var reviewsCtrl = require('../controllers/reviews');

router.post('/matches/:id/reviews', isLoggedIn, reviewsCtrl.create);
router.get('/reviews/:id/edit', isLoggedIn, reviewsCtrl.edit)
router.patch('matches/:id/reviews', isLoggedIn, reviewsCtrl.update)

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/auth/google");
}

module.exports = router;