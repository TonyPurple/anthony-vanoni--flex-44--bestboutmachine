const Profile = require('../models/profile');

function index(req, res) {
    Profile.findById(req.params.profileId)
        .then(profile => {
            console.log(profile)
            res.render('profiles/index', {
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

module.exports = {
    index
};