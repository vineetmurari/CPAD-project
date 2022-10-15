const express = require("express");
const {getmedicines} = require('../controller/medicine')
const router = express.Router();
const {auth} = require('../controller/auth')


router.get('/getmedicines', auth, getmedicines)

  module.exports = router;