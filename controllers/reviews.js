var Match = require('../models/match');
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
        });
    });
}

function edit(req, res) {
    // Match.findOne({ 'reviews._id': req.params.id }, function(err, review) {
    // Reviews.findById(req.params.id)
    //     .then(review => {
    //         // Verify review is "owned" by logged in user
    //         if (!review.user.equals(req.user._id)) return res.redirect('/matches');
    res.render('reviews/edit', {
        title: 'Edit Review',
        review: Match.findOne({ 'reviews._id': req.params.id })
    })
};


function update(req, res) {
    Match.findOne({ 'reviews._id': req.params.id }, function(err, match) {
        const reviewDoc = match.reviews.id(req.params.id);
        reviewDoc.update({ _id: req.params.id }, req.body.content, req.body.rating)
        match.save(function(err) {
            // Redirect back to the match's show view
            res.redirect(`/matches/${match._id}`);
        });
    });
}
// Note the cool "dot" syntax to query on the property of a subdoc
//     Match.findOne({ 'reviews._id': req.params.id }, function(err, match) {
//         // Find the comment subdoc using the id method on Mongoose arrays
//         // https://mongoosejs.com/docs/subdocs.html
//         const reviewSubdoc = match.reviews.id(req.params.id);
//         // Ensure that the comment was created by the logged in user
//         if (!reviewSubdoc.userId.equals(req.user._id)) return res.redirect(`/matches/${match._id}`);
//         // Update the text of the comment
//         reviewSubdoc.content = req.body.content;
//         reviewSubdoc.rating = req.body.rating;
//         // Save the updated book
//         console.log(review)
//         match.save(function(err) {
//             // Redirect back to the book's show view
//             res.redirect(`/matches/${match._id}`);
//         });
//     });
// }
//     Match.findOne({ 'reviews._id': req.params.id }, function(err, match) {
//         // Find the comment subdoc using the id method on Mongoose arrays
//         // https://mongoosejs.com/docs/subdocs.html
//         const reviewSubdoc = match.reviews.id(req.params.id);
//         // Ensure that the comment was created by the logged in user
//         if (!reviewSubdoc.userId.equals(req.user._id)) return res.redirect(`/matches/${match._id}`);
//         // Update the text of the comment
//         reviewSubdoc.content = req.body.content;
//         reviewSubdoc.rating = req.body.rating;
//         match.save(function(err) {
//             res.redirect(`/matches/${match._id}`);
//         });
//     });
// }
//     Match.findByIdAndUpdate(req.params.id, req.body)
//         .then(match => {
//             res.redirect(`/matches/${match._id}`)
//         })
//         .catch(err => {
//             res.redirect(`/matches/${matches._id}/edit`)
//         })
// }

module.exports = {
    create,
    edit,
    update,
    deleteReview
};