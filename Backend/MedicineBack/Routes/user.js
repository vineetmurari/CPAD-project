const express = require("express");
const {signup, signin, signout} = require('../controller/user')
const router = express.Router();
const {check} = require('express-validator')

router.post('/signup', [
  check("name", "name should be atleast 3 characters").isLength({
    min: 3,
  }),
  check("email", "Email should be valid").isEmail(),
  check("password", "Password should be atleast 6 characters").isLength({
    min: 6,
  }),
], signup)



router.post('/signin',
[
  check("email", "Email should be valid").isEmail(),
  check("password", "Password should be atleast 6 characters").isLength({
    min: 6,
  }),
],
signin)

router.get('/signout', signout)


module.exports = router;


