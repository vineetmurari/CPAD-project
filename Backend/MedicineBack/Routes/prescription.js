const express = require("express");
const {poststatus} = require('../controller/prescription')
const {updatestatus} = require('../controller/prescription')
const {getstatus} = require('../controller/prescription')
const router = express.Router();
const {auth} = require('../controller/auth')

router.post('/poststatus/:name/:id', poststatus)
router.put('/updatestatus/:id', updatestatus)
router.get('/getstatus/:name/:id', getstatus)

module.exports = router;