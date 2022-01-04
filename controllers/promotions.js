const Promotion = require('../models/promotion');
const Match = require('../models/match');

module.exports = {
    new: newPromotion,
    create
};

function create(req, res) {
    Promotion.create(req.body, function(err, promotion) {
        res.redirect('/promotions/new');
    });
}

function newPromotion(req, res) {
    Promotion.find({}, function(err, promotions) {
        res.render('promotions/new', {
            title: 'Add Promotion',
            promotions
        });
    })
}