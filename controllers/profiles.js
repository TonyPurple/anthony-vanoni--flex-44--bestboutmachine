const Profile = require('../models/profile');
const Match = require('../models/match')

function index(req, res) {
    Profile.findById(req.params.profileId)
        .populate({
            path: 'reviews',
            populate: {
                path: 'match'
            }
        })
        .then(profile => {
            res.render('profiles/show', {
                title: 'User Profile',
                profile,
                user: req.user ? req.user : null
            })
        })
        .catch(err => {
            console.log(err)
            res.redirect(`/profiles/${req.user.profile}`)
        })
}

//index boutList on profile view
function show(req, res) {
    Profile.findById(req.params.id)
        .populate('boutList')
        .then(profile => {
            res.render('profiles/show', {
                title: "User Profile",
                user: req.user,
                profile
            })
        })
}

module.exports = {
    index,
    show
};