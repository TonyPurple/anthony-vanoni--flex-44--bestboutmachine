const Match = require('../models/match')

async function index(req, res) {
    Match.find({ 'reviews.rating': { $gt: 4 } })
        .sort({ _id: -1 })
        .limit(10)
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