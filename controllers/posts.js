const Post = require('../models/post');
const Profile = require('../models/profile')

function index(req, res) {
    Post.find({})
        .populate('postedBy')
        .sort({ createdAt: "ascending" })
        .then((posts) => {
            Profile.findById(req.user.profile)
                .then(userProfile => {
                    res.render('posts/index', {
                        title: 'Promo Board',
                        posts: posts.reverse(),
                        userProfile,
                        user: req.user ? req.user : null,
                    })
                })
        })
}

function create(req, res) {
    req.body.postedBy = req.user.profile._id
    req.body.userName = req.user.profile.name
    Post.create(req.body)
        .then(post => {
            Profile.findById(req.user.profile._id)
                .then(profile => {
                    res.redirect('/posts')
                })
        })
}

function show(req, res) {
    Post.findById(req.params.id)
        .populate('postedBy')
        .populate({
            path: 'replies',
            populate: {
                path: 'repliedBy'
            }
        })
        .then((post) => {
            //find profile for current logged in user
            Profile.findById(req.user.profile.id)
                .then(profile => {
                    res.render('posts/show', {
                        title: 'Read and Reply to Promo',
                        post,
                        profile,
                        user: req.user ? req.user : null
                    })
                })
        })
}

function update(req, res) {
    Post.findByIdAndUpdate(req.params.id, req.body, function(err, post) {
        res.redirect('/posts')
    })
}

// function reply(req, res) {
//     Post.findById(req.params.id)
//         .then((post) => {
//             req.body.repliedBy = req.user.profile._id
//             post.replies.push(req.body)
//             post.save()
//                 .then(() => {
//                     res.redirect(`/posts/${req.params.id}`)
//                 })
//         })
// }

function deletePost(req, res) {
    Post.findByIdAndDelete(req.params.id, function(err, post) {
        res.redirect('/posts')
    })
}

// function deleteReply(req, res) {
//     // Note the cool "dot" syntax to query on the property of a subdoc
//     Post.findOne({ 'replies._id': req.params.id }, function(err, post) {
//         const replyDoc = post.replies.id(req.params.id);
//         replyDoc.remove({ _id: req.params.id })
//         post.save(function(err) {
//             // Redirect back to the post's show view
//             res.redirect(`/posts/${post._id}`);
//         });
//     });
// }


module.exports = {
    index,
    create,
    show,
    deletePost,
    update
}