var router = require('express').Router();
const indexCtrl = require('../controllers/index')

/* GET home page. */
router.get('/', indexCtrl.index);

module.exports = router;