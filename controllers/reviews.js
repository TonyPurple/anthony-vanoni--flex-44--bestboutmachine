var Match = require('../models/match');

module.exports = {
    create
};

function create(req, res) {
    //set creator = user
    req.body.reviewer = req.user.profile._id
    Match.findById(req.params.id, function(err, match) {
        match.reviews.push(req.body);
        match.save(function(err) {
            res.redirect(`/matches/${match._id}`);
        });
    });
}