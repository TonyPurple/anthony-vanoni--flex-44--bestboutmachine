const Match = require('../models/match')

function index(req, res) {
    Match.find({})
        .sort({ _id: -1 })
        .limit(6)
        .then(matches => {
            res.render('index', {
                matches,
                title: 'Best Bout Machine',
                user: req.user ? req.user : null
            })
        })
}

module.exports = {
    index
}