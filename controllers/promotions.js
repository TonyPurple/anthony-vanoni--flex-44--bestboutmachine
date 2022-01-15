const Promotion = require('../models/promotion');
const Match = require('../models/match')

function create(req, res) {
    Promotion.create(req.body)
        .then((promotion) =>
            res.redirect(`/promotions/${promotion._id}`))
        .catch(err => {
            console.log(err)
            res.redirect('/promotions/new')
        })
}

function newPromotion(req, res) {
    Promotion.find({}, function(err, promotions) {
            res.render('promotions/new', {
                title: 'Add Promotion',
                promotions
            })
        })
        .catch(e => {
            console.log(e)
        })
}

function index(req, res) {
    Promotion.find({})
        .sort({ country: 'ascending' })
        .then(promotions => {
            res.render("promotions/index", {
                title: "Top Promotions",
                promotions,
            })
        })
        .catch(e => {
            console.log(e)
        })
}

function show(req, res) {
    Promotion.findById(req.params.id)
        .populate(
            'matches'
        )
        .then(promotion =>
            Match.find({}).where('promotion').in(promotion.name)
            .then(matches => {
                res.render('promotions/show', { title: 'Promotion Details', promotion, matches });
            })
        )
        .catch(e => {
            console.log(e)
        })
}

module.exports = {
    new: newPromotion,
    create,
    index,
    show
};