const Match = require('../models/match')
const Profile = require('../models/profile');

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
    res.render('matches/new', { title: 'Nominate a Match' })
        .catch(err => {
            console.log(err)
            res.redirect('/')
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
            res.redirect('/matches/index')
        })
}

function deleteMatch(req, res) {
    Match.findByIdAndDelete(req.params.id, function(err, match) {
        if (err) return res.redirect('/matches');
        res.redirect('/matches');
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

// function search(req, res) {
//     // Make the query object to use with Match.find based upon
//     // if the user has submitted via a search form for a promotion name
//     let matchQuery = req.query.match.promotion ? { promotion: new RegExp(req.query.match.promotion, 'i') } : {};
//     Match.find(matchQuery, function(err, matches) {
//         // Why not reuse the matches/index template?
//         res.render('/matches/index', {
//             matches,
//             user: req.user,
//             promotionSearch: req.query.match.promotion // use to set content of search form
//         });
//     });
// }
function matchSearch(req, res) {
    console.log(req.body)
    res.redirect("/")
}

module.exports = {
    index,
    show,
    new: newMatch,
    create,
    delete: deleteMatch,
    bestBout,
    matchSearch
};