var router = require('express').Router();
var postsCtrl = require('../controllers/posts');

//index all posts in database
router.get('/', isLoggedIn, postsCtrl.index)
    // handle new post form being submitted
router.post('/', isLoggedIn, postsCtrl.create)
    //show a post's details
router.get('/:id', isLoggedIn, postsCtrl.show)
    // delete a post
router.delete('/:id', isLoggedIn, postsCtrl.deletePost)
    //update a post
router.put('/:id', isLoggedIn, postsCtrl.update)


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/auth/google");
}

module.exports = router;