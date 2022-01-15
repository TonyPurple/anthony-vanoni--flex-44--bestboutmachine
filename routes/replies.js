const router = require('express').Router();
const repliesCtrl = require('../controllers/replies');

// reply to a post
router.post('/posts/:id/replies', isLoggedIn, repliesCtrl.reply)
    // delete a reply
router.delete('/:id/replies/:id', isLoggedIn, repliesCtrl.deleteReply)
    // view a form for editing a reply
router.get('/replies/:id/edit', isLoggedIn, repliesCtrl.edit)
    // handle edit reply form
router.put('/replies/:id', isLoggedIn, repliesCtrl.update)

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/auth/google");
}

module.exports = router;