const Promotion = require('../models/promotion');
const Match = require('../models/match');
const Profile = require('../models/profile');

function create(req, res) {
    req.body.addedBy = req.user.profile._id
    req.body.userName = req.user.profile.name
    Promotion.create(req.body)
        .then((promotion) =>
            res.redirect(`/promotions/${promotion._id}`))
        .catch(err => {
            console.log(err)
            res.redirect('/promotions/new')
        })
}

function newPromotion(req, res) {
    Promotion.find({}).sort({ name: 'ascending' })
        .then(promotions => {
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
        .sort({ country: 1, name: 1 })
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
        .populate('addedBy')
        .populate(
            'matches'
        )
        .then((promotion) => {
            Profile.findById(req.user.profile.id)
                .then(profile => {
                    Match.find({}).where('promotion').in(promotion.name)
                        .then(matches => {
                            res.render('promotions/show', { title: `${promotion.name}'s Details`, promotion, matches, profile });
                        })
                })
                .catch(e => {
                    console.log(e)
                })
        })
}

function edit(req, res) {
    Promotion.findById(req.params.id)
        .then(promotion => {
            res.render('promotions/edit', { title: 'Edit Promotion', promotion })
        })
}

function update(req, res) {
    Promotion.findByIdAndUpdate(req.params.id)
        .then(promotion => {
            if (req.body.name == null || req.body.name == "", req.body.country == null || req.body.country == "") {
                return res.redirect(`/promotions/${promotion._id}`)
            } else
                promotion.update(req.body)
                .then(() => {
                    res.redirect(`/promotions/${promotion._id}`)
                })
                .catch(err => {
                    console.log(err)
                    res.redirect(`/promotions/${promotion._id}`)
                })
        })
}

module.exports = {
    new: newPromotion,
    create,
    index,
    show,
    edit,
    update
};