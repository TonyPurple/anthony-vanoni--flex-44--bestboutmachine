const Match = require('../models/match');
const Profile = require('../models/profile');

function create(req, res) {
    Match.findById(req.params.id)
        .then(match => {
            req.body.reviewer = req.user.profile._id;
            req.body.userName = req.user.profile.name;
            if (req.body.content === '') return res.redirect(`/matches/${match._id}`)
            else
                match.reviews.push(req.body);
            match.save()
                .then(() => {
                    res.redirect(`/matches/${match._id}`);
                })
        })
        .catch(err => {

            console.log(err)
            res.redirect(`/matches/${match._id}`)
        })
}

function deleteReview(req, res) {
    // Note the cool "dot" syntax to query on the property of a subdoc
    Match.findOne({ 'reviews._id': req.params.id }, function(err, match) {
        const reviewDoc = match.reviews.id(req.params.id);
        reviewDoc.remove({ _id: req.params.id })
        match.save(function(err) {
            // Redirect back to the match's show view
            res.redirect(`/matches/${match._id}`);
        })
    })
}

function edit(req, res) {
    Match.findOne({ 'reviews._id': req.params.id }, function(err, match) {
        const reviews = match.reviews.id(req.params.id);
        res.render('reviews/edit', { title: 'Edit Review', reviews })
    })
}


function update(req, res) {
    Match.findOne({ 'reviews._id': req.params.id }, function(err, match) {
        const reviewUpdate = match.reviews.id(req.params.id);
        reviewUpdate.content = req.body.content;
        reviewUpdate.rating = req.body.rating;
        match.save(function(err) {
            res.redirect(`/matches/${match._id}`);
        })
    })
}

module.exports = {
    create,
    edit,
    update,
    deleteReview
};