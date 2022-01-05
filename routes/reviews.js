var router = require('express').Router();
var reviewsCtrl = require('../controllers/reviews');

router.post('/matches/:id/reviews', reviewsCtrl.create);

module.exports = router;