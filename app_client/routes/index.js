var express = require('express');
var router = express.Router();
var ctrlAdmin = require('../controllers/admin');


/* GET admin pages */
router.get('/', ctrlAdmin.admin);

module.exports = router;
