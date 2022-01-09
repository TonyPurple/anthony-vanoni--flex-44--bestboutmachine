var Match = require('../models/match');
const Profile = require('../models/profile');

function create(req, res) {
    Match.findById(req.params.id)
        .then(match => {
            req.body.reviewer = req.user.profile._id;
            req.body.userName = req.user.profile.name;
            match.reviews.push(req.body);
            match.save()
                // .then(() => {
                //     Profile.findById(req.user.profile._id)
                //         .then(profile => {
                //             profile.reviews.push(req.body)
                //             profile.save()
                //         })
                // })
                .then(() => {
                    res.redirect(`/matches/${match._id}`);
                })
        })
}
//         .catch(err => {
//             console.log(err)
//             res.redirect('/')
//         })
// }

function deleteReview(req, res) {
    // Note the cool "dot" syntax to query on the property of a subdoc
    Match.findOne({ 'reviews._id': req.params.id }, function(err, match) {
        // Find the comment subdoc using the id method on Mongoose arrays
        // https://mongoosejs.com/docs/subdocs.html
        const reviewSubdoc = match.reviews.id(req.params.id);
        // Ensure that the comment was created by the logged in user
        if (!reviewSubdoc.userId.equals(req.user._id)) return res.redirect(`/matches/${match._id}`);
        // Remove the comment using the remove method of the subdoc
        reviewSubdoc.remove();
        // Save the updated book
        match.save(function(err) {
            // Redirect back to the book's show view
            res.redirect(`/matches/${match._id}`);
        });
    });
}

// function deleteReview(req, res) {
//     Match.findById(req.params.matchId)
//         .then((match => {
//             match.reviews.findByIdAndDelete(req.params._id)
//                 // match.reviews.remove(req.params._id);
//             match.save()
//                 .then(() => {
//                     res.redirect(`/matches/${req.params._id}`)
//                 });
//         }))
//         .catch(err => {
//             console.log(err)
//             res.redirect('/')
//         })
// }

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
    function update(req, res) {
        // Note the cool "dot" syntax to query on the property of a subdoc
        Match.findOne({ 'reviews._id': req.params.id }, function(err, match) {
            // Find the comment subdoc using the id method on Mongoose arrays
            // https://mongoosejs.com/docs/subdocs.html
            const reviewSubdoc = match.reviews.id(req.params.id);
            // Ensure that the comment was created by the logged in user
            if (!reviewSubdoc.userId.equals(req.user._id)) return res.redirect(`/matches/${match._id}`);
            // Update the text of the comment
            reviewSubdoc.content = req.body.content;
            reviewSubdoc.rating = req.body.rating;
            // Save the updated book
            match.save(function(err) {
                // Redirect back to the book's show view
                res.redirect(`/matches/${match._id}`);
            });
        });
    }
}
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