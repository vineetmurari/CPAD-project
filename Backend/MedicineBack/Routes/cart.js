const express = require("express");
const {addtocart} = require('../controller/cart')
const router = express.Router();
const {auth} = require('../controller/auth')


router.post('/addtocart', auth, addtocart)

  module.exports = router;