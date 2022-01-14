const Profile = require('../models/profile');
const Match = require('../models/match');

function index(req, res) {
    Profile.find({})
        .then(profiles => {
            res.render("profiles/index", {
                title: "User Profiles",
                // user: req.user ? req.user : null,
                profiles,
            })
        })
        .catch(e => {
            console.log(e)
        })
}

//index boutList on profile view
function show(req, res) {
    //find profile for user that was clicked
    Profile.findById(req.params.id)
        .populate('boutList')
        .populate('faction')
        .then(profile => {
            Match.find({ nominatedBy: profile._id })
                .then(matches => {
                    //find profile for current logged in user
                    Profile.findById(req.user.profile)
                        .then(userProfile => {
                            res.render('profiles/show', {
                                title: `${profile.name}'s profile`,
                                user: req.user,
                                profile,
                                userProfile,
                                matches
                            })
                        })
                })
        })
        .catch(err => {
            console.log(err)
            res.redirect("/")
        })
}

//remove from best bout list
function deleteBout(req, res) {
    Profile.findById(req.user.profile._id)
        .populate('boutList')
        .then(profile => {
            const bestbouts = profile.boutList
            bestbouts.remove({ _id: req.params.id })
            profile.save(function(err) {
                res.redirect(`/profiles/${profile._id}`)
            })
        })
}

//create or update bio
function update(req, res) {
    Profile.findByIdAndUpdate(req.params.id, req.body, function(err, profile) {
        if (req.body.content === '') return res.redirect(`/profiles/${profile._id}`)
        else
            res.redirect(`/profiles/${profile._id}`)
    })
}

// add other user profile to faction for quick access to their info
function follow(req, res) {
    Profile.findById(req.user.profile)
        .then(profile => {
            profile.faction.push(req.params.id)
            profile.save()
                .then(() => {
                    res.redirect(`/profiles/${req.params.id}`)
                })
        })
        .catch((err) => {
            console.log(err)
            res.redirect('/')
        })
}

//stop following a profile i.e turn heel
function unfollow(req, res) {
    Profile.findById(req.user.profile)
        .then(profile => {
            profile.faction.remove({ _id: req.params.id })
            profile.save()
                .then(() => {
                    res.redirect(`/profiles/${req.params.id}`)
                })
        })
        .catch(err => {
            console.log(err)
            res.redirect('/')
        })
}

module.exports = {
    index,
    show,
    deleteBout,
    update,
    follow,
    unfollow,
}