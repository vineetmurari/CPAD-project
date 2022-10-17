const express = require("express");
const {addtocart} = require('../controller/cart')
const {updateOrdered} = require('../controller/cart')
const {getcartitems} = require('../controller/cart')
const router = express.Router();
const {auth} = require('../controller/auth')


router.post('/addtocart', auth, addtocart)
router.put('/cart/:id', auth, updateOrdered)
router.get('/cartitems/:id', auth, getcartitems)

  module.exports = router;