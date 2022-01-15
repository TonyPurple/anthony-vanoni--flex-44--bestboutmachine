const router = require('express').Router();
const matchesCtrl = require('../controllers/matches');

//index all matches in database
router.get('/', isLoggedIn, matchesCtrl.index);
//nominate new match form
router.get('/new', isLoggedIn, matchesCtrl.new);
//show a match's details
router.get('/:id', isLoggedIn, matchesCtrl.show);
//create a new a match in the database
router.post('/', isLoggedIn, matchesCtrl.create);
// push match to profile
router.get('/:id/profiles/', isLoggedIn, matchesCtrl.bestBout)
    // delete match from database
router.delete('/:id', isLoggedIn, matchesCtrl.delete);
// view a form for editing a match
router.get('/:id/edit', isLoggedIn, matchesCtrl.edit)
    //update a match
router.put('/:id', isLoggedIn, matchesCtrl.update)

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/auth/google");
}

module.exports = router;