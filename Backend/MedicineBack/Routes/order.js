const express = require("express");
const {postorders,getorder } = require('../controller/order')
const router = express.Router();
const {auth} = require('../controller/auth')

router.post('/createorder', auth, postorders)
router.get('/getorder/:id', auth, getorder)

module.exports = router;