const Match = require('../models/match')

function index(req, res) {
    Match.find({}, function(err, matches) {
        res.render('matches/index', { title: 'Recently Nominated Matches', matches });
    }).sort({ date: 'ascending' })
}

function show(req, res) {
    Match.findById(req.params.id)
        .populate({
            path: 'reviews',
            populate: {
                path: 'reviewer'
            }
        }).then(match => {
            res.render('matches/show', { title: 'Match Details', match });
        })
};

function newMatch(req, res) {
    res.render('matches/new', { title: 'Nominate a Match' });
}

function create(req, res) {
    const match = new Match(req.body)
    match.save(function(err) {
        // one way to handle errors
        if (err) return res.redirect('/matches/new');
        console.log(match);
        res.redirect(`/matches/${match._id}`);
    });
}

function deleteMatch(req, res) {
    Match.findByIdAndDelete(req.params.id, function(err, match) {
        if (err) return res.redirect('/matches');
        res.redirect('/matches');
    });
};

module.exports = {
    index,
    show,
    new: newMatch,
    create,
    delete: deleteMatch
};