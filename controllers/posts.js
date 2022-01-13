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
        .catch(err => {
            console.log(err)
            res.redirect('/')
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
        .catch(err => {
            console.log(err)
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
        .catch(err => {
            console.log(err)
            res.redirect('/posts')
        })
}

function update(req, res) {
    Post.findByIdAndUpdate(req.params.id, req.body, function(err, post) {
        res.redirect('/posts')
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
    deletePost,
    update
}