var Match = require('../models/match');

module.exports = {
    create
};

function create(req, res) {
    Match.findById(req.params.id, function(err, match) {
        match.reviews.push(req.body);
        match.save(function(err) {
            res.redirect(`/matches/${match._id}`);
        });
    });
}