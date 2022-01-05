var Match = require('../models/match');

function create(req, res) {
    Match.findById(req.params.id, function(err, match) {
        //set creator = user
        req.body.reviewer = req.user.profile._id;
        req.body.userName = req.user.profile.name;
        match.reviews.push(req.body);
        match.save(function(err) {
            res.redirect(`/matches/${match._id}`);
        });
    });
}

function edit(req, res) {
    Review.findById(req.params.id, function(err, review) {
        // Verify review is "owned" by logged in user
        if (!review.user.equals(req.user._id)) return res.redirect('/matches');
        res.render('reviews/:id/reviewEdit', { review });
    });
}

module.exports = {
    create,
    edit
};