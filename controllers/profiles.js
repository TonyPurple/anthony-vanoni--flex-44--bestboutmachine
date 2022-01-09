const Profile = require('../models/profile');
const Match = require('../models/match')

// function index(req, res) {
//     Profile.findById(req.params.profileId)
//         // .populate({
//         //     path: 'reviews',
//         //     // populate: {
//         //     //     path: 'match'
//         //     // }
//         // })
//         .then(profile => {
//             res.render('profiles/show', {
//                 title: 'User Profile',
//                 profile,
//                 user: req.user ? req.user : null
//             })
//         })
//         .catch(err => {
//             console.log(err)
//             res.redirect(`/profiles/${req.user.profile}`)
//         })
// }

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
    Profile.findById(req.params.id)
        .populate('boutList')
        .populate('faction')
        .then(profile => {
            Match.find({ nominatedBy: profile._id })
                .then(matches => {
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

function edit(req, res) {
    Profile.findById(req.params.id)
        .then(profile => {
            res.render("profiles/edit", {
                title: `Repackaging ${profile.name}'s gimmick`,
                profile
            })
        })
        .catch(err => {
            console.log(err)
            res.redirect("/")
        })
}

function update(req, res) {
    Profile.findByIdAndUpdate(req.params.id, req.body)
        .then(profile => {
            res.redirect(`/profiles/${profile._id}`)
        })
        .catch(err => {
            console.log(err)
            res.redirect("/")
        })
}

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

function heelTurn(req, res) {
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

// function isAdmin(req, res) {
//     if (user.profile._id == "61d23943f2c64a2367183a53") {
//         isAdmin === true
//     } else
//         isAdmin === false
// }

// function addFaction()

module.exports = {
    index,
    show,
    deleteBout,
    update,
    edit,
    follow,
    heelTurn
    // isAdmin,
    // addFaction
}