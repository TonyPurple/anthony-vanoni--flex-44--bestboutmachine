const router = require('express').Router();
const promotionsCtrl = require('../controllers/promotions');

router.get('/promotions/new', isLoggedIn, promotionsCtrl.new);
router.get('/promotions/index', isLoggedIn, promotionsCtrl.index)
router.get('/promotions/:id', isLoggedIn, promotionsCtrl.show)
router.post('/promotions', isLoggedIn, promotionsCtrl.create);
// view a form for editing a promotion
router.get('/:id/edit', isLoggedIn, promotionsCtrl.edit)
    //update a promotion
router.put('/promotions/:id', isLoggedIn, promotionsCtrl.update)

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/auth/google");
}

module.exports = router;