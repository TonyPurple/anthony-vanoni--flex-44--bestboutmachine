var router = require('express').Router();
var postsCtrl = require('../controllers/posts');

router.get('/', isLoggedIn, postsCtrl.index)
router.post('/', isLoggedIn, postsCtrl.create)
router.get('/:id', isLoggedIn, postsCtrl.show)
router.post('/:id', isLoggedIn, postsCtrl.reply)
router.delete('/:id', isLoggedIn, postsCtrl.delete)

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/auth/google");
}

module.exports = router;