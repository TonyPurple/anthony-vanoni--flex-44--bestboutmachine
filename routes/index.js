var router = require('express').Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'Best Bout Machine', user: req.user ? req.user : null })
})

module.exports = router;