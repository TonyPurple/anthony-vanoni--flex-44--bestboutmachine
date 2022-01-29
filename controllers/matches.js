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
        .then((match) => {
            //find profile for current logged in user
            Profile.findById(req.user.profile.id)
                .then(profile => {
                    res.render('matches/show', { title: 'Match Details', match, profile, bestBoutedBy: match.bestBoutedBy });
                })
                .catch(err => {
                    console.log(err)
                    res.redirect('/matches/index')
                })
        })
}



function newMatch(req, res) {
    Match.find({}).sort({ wrestlers: 'ascending' })
        .then(matches => {
            Promotion.find({}).sort({ name: 'ascending' })
                .then(promotions => {
                    const newMatch = new Match();
                    const dt = newMatch.date;
                    const boutDate = dt.toISOString().slice(0, 16);
                    res.render('matches/new', {
                        title: 'Nominate a Match',
                        matches,
                        promotions,
                        boutDate
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
            res.redirect('/matches/new')
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
    // find profile we want to add match to
    Profile.findById(req.user.profile._id)
        .then(profile => {
            // push the match obj id to that profile
            profile.boutList.push(req.params.id)
            Match.findById(req.params.id)
                .then(match => {
                    // push the profile obj id to array
                    match.bestBoutedBy.push(req.user.profile._id)
                        //save match
                    match.save()
                        // save profile
                    profile.save()
                        // redirect to profile/show view
                    res.redirect(`/profiles/${profile._id}`)
                })
                .catch(err => {
                    console.log(err)
                    res.redirect(`/matches/${match._id}`)
                })
        })
}

function edit(req, res) {
    Match.findById(req.params.id)
        .then(match => {
            Promotion.find({}).sort({ name: 'ascending' })
                .then(promotions => {
                    const dt = match.date
                    const boutDate = dt.toISOString().slice(0, 16)
                    res.render('matches/edit', { title: 'Edit Match', match, promotions, boutDate })
                })
        })
}

function update(req, res) {
    Match.findByIdAndUpdate(req.params.id)
        .then(match => {
            if (req.body.event == null || req.body.event == "", req.body.wrestlers == null || req.body.wrestlers == "", req.body.matchType == null || req.body.matchType == "", req.body.result == null || req.body.result == "") {
                return res.redirect(`/matches/${match._id}`)
            } else
                match.update(req.body)
                .then(() => {
                    res.redirect(`/matches/${match._id}`)
                })
                .catch(err => {
                    console.log(err)
                    res.redirect(`/matches/${match._id}`)
                })
        })
}
module.exports = {
    index,
    show,
    new: newMatch,
    create,
    delete: deleteMatch,
    bestBout,
    edit,
    update
};