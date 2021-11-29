const express = require('express');
const router = express.Router({mergeParams:true})

let post = require('./post');
router.post('/login',post.login)
      .post('/signup',post.signup)
module.exports= router;
