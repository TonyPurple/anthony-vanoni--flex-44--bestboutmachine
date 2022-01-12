var router = require('express').Router();
var repliesCtrl = require('../controllers/replies');

// reply to a post
router.post('/posts/:id/replies', isLoggedIn, repliesCtrl.reply)
    // delete a reply
router.delete('/:id/replies/:id', isLoggedIn, repliesCtrl.deleteReply)

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/auth/google");
}

module.exports = router;