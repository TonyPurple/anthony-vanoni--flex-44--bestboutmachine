var router = require('express').Router();
const promotionsCtrl = require('../controllers/promotions');

router.get('/promotions/new', promotionsCtrl.new);
router.post('/promotions', promotionsCtrl.create);

module.exports = router;