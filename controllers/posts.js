const Post = require('../models/post');

function index(req, res) {
    Post.find({})
        .populate('postedBy')
        .sort({ createdAt: "ascending" })
        .then((posts) => {
            res.render('posts/index', {
                title: 'Discussion Board',
                posts: posts.reverse(),
                user: req.user ? req.user : null,
            })
        })
}

function create(req, res) {
    req.body.postedBy = req.user.profile._id
    Post.create(req.body)
        .then(() => {
            res.redirect('/posts')
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
            res.render('posts/show', {
                title: 'Read Full Post',
                post,
                user: req.user ? req.user : null
            })
        })
}

function reply(req, res) {
    Post.findById(req.params.id)
        .then((post) => {
            req.body.repliedBy = req.user.profile._id
            post.replies.push(req.body)
            post.save()
                .then(() => {
                    res.redirect(`/posts/${req.params.id}`)
                })
        })
}

function deletePost(req, res) {
    Post.findByIdAndDelete(req.params.id, function(err, post) {
        res.redirect('/posts')
    })
}


module.exports = {
    index,
    create,
    show,
    reply,
    delete: deletePost
}