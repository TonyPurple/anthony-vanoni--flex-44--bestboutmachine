var router = require('express').Router();
const promotionsCtrl = require('../controllers/promotions');

router.get('/promotions/new', isLoggedIn, promotionsCtrl.new);
router.get('/promotions/index', isLoggedIn, promotionsCtrl.index)
router.get('/promotions/:id', isLoggedIn, promotionsCtrl.show)
router.post('/promotions', isLoggedIn, promotionsCtrl.create);

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/auth/google");
}

module.exports = router;