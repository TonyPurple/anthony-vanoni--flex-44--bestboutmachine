var router = require('express').Router();
var reviewsCtrl = require('../controllers/reviews');

// handle new review form being submitted
router.post('/matches/:id/reviews', isLoggedIn, reviewsCtrl.create);
// view a form for editing a review
router.get('/reviews/:id/edit', isLoggedIn, reviewsCtrl.edit)
    // handle edit review form - not working properly
router.put('/reviews/:id', isLoggedIn, reviewsCtrl.update)
router.delete('/matches/:id/reviews/:id', isLoggedIn, reviewsCtrl.deleteReview)

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/auth/google");
}

module.exports = router;