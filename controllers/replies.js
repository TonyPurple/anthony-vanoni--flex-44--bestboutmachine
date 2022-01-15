const Post = require('../models/post');
const Profile = require('../models/profile');

function reply(req, res) {
    Post.findById(req.params.id)
        .then((post) => {
            req.body.repliedBy = req.user.profile._id
            req.body.userName = req.user.profile.name;
            if (req.body.content === '') return res.redirect(`/posts/${req.params.id}`)
            else
                post.replies.push(req.body)
            post.save()
                .then(() => {
                    res.redirect(`/posts/${req.params.id}`)
                })
                .catch(e => {
                    console.log(e)
                })
        })
}


function deleteReply(req, res) {
    // Note the cool "dot" syntax to query on the property of a subdoc
    Post.findOne({ 'replies._id': req.params.id }, function(err, post) {
        const replyDoc = post.replies.id(req.params.id);
        replyDoc.remove({ _id: req.params.id })
        post.save(function(err) {
                // Redirect back to the post's show view
                res.redirect(`/posts/${post._id}`);
            })
            .catch(e => {
                console.log(e)
            })
    })
}

module.exports = {
    reply,
    deleteReply
};