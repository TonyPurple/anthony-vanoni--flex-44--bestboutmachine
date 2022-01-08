function index(req, res, isAdmin) {
    res.render('index', { title: 'Best Bout Machine', user: req.user ? req.user : null, isAdmin })
}

module.exports = {
    index
}