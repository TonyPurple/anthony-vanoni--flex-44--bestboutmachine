const Match = require('../models/match')
const Profile = require('../models/profile');
const Promotion = require('../models/promotion');

function index(req, res) {
    Match.find({})
        .sort({ date: 'ascending' })
        .then(matches => {
            res.render('matches/index', { title: 'Recently Nominated Matches', matches });
        })
        .catch(err => {
            console.log(err)
            res.redirect('/')
        })
}

function show(req, res) {
    Match.findById(req.params.id)
        .populate('nominatedBy')
        .populate('bestBoutedBy')
        .then(match => {
            res.render('matches/show', { title: 'Match Details', match });
        })
        .catch(err => {
            console.log(err)
            res.redirect('/matches/index')
        })
}


function newMatch(req, res) {
    Match.find({}, function(err, matches) {
        Promotion.find({}, function(err, promotions) {
            res.render('matches/new', {
                title: 'Nominate a Match',
                matches,
                promotions
            });
        })
    })
}

function create(req, res) {
    req.body.nominatedBy = req.user.profile._id
    req.body.userName = req.user.profile.name
    Match.create(req.body)
        .then((match) =>
            res.redirect(`/matches/${match._id}`))
        .catch(err => {
            console.log(err)
            res.redirect('/matches')
        })
}




function deleteMatch(req, res) {
    Match.findByIdAndDelete(req.params.id)
        .then(match => {
            res.redirect('/matches');
        })
        .catch(err => {
            console.log(err)
            res.redirect('/matches')
        })
}


function bestBout(req, res) {
    req.body.bestBoutedBy = req.user.profile._id
        // find profile we want to add match to
    Profile.findById(req.user.profile._id)
        .then(profile => {
            // push the match obj id to that profile
            profile.boutList.push(req.params.id)
                // save 
            profile.save()
                // redirect to profile/show view
            res.redirect(`/profiles/${profile._id}`)
        })
        .catch(err => {
            console.log(err)
            res.redirect(`/matches/${match._id}`)
        })
}

module.exports = {
    index,
    show,
    new: newMatch,
    create,
    delete: deleteMatch,
    bestBout
};