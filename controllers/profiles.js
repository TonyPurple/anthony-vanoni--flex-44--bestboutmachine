const Profile = require('../models/profile');

function index(req, res) {
    Profile.find({})
        .then(profiles => {
            console.log(profiles)
            res.render('profiles/index', {
                title: 'User Profile',
                profiles,
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