const Match = require('../models/match')
const Profile = require('../models/profile');

function index(req, res) {
    Match.find({})
        .sort({ date: 'ascending' })
        .then(matches => {
            res.render('matches/index', { title: 'Recently Nominated Matches', matches });
        })
}

function show(req, res) {
    Match.findById(req.params.id)
        .populate('nominatedBy')
        .populate('bestBoutedBy')
        .then(match => {
            res.render('matches/show', { title: 'Match Details', match });
        })
};

function newMatch(req, res) {
    res.render('matches/new', { title: 'Nominate a Match' });
}

function create(req, res) {
    req.body.nominatedBy = req.user.profile._id
    req.body.userName = req.user.profile.name
    Match.create(req.body)
        .then((match) =>
            res.redirect(`/matches/${match._id}`)
        )
}

function deleteMatch(req, res) {
    Match.findByIdAndDelete(req.params.id, function(err, match) {
        if (err) return res.redirect('/matches');
        res.redirect('/matches');
    });
};

function bestBout(req, res) {
    req.body.bestBoutedBy = req.user.profile._id
        // find profile we want to add match to
    Profile.findById(req.user.profile._id, function(err, profile) {
        // push the match obj id to that profile
        profile.boutList.push(req.params.id)
            // save 
        profile.save(function(err) {
            // redirect to profile/index view
            res.redirect(`/profiles/${profile._id}`)
        })
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