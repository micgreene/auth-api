'use strict';

const express = require('express');

const User = require('../models/user.js');
const basicAuth = require('../middleware/basic-auth-mw.js');
const bearerAuth = require('../middleware/bearer-auth-mw.js');
const acl = require('../middleware/acl-middleware.js');

const auth = express.Router();

auth.post('/signup', async (req,res) => {  
  let user = new User(req.body);
  const record = await user.save();
  res.status(201).json(record);//only returning record for learning purposes
});

auth.post('/signin', basicAuth, (req,res)=>{
  let userDetails = {
    details: req.user,
    accessToken: req.user.token
  }
  res.status(200).json(userDetails);
});

auth.post('/must-be-signed-in', bearerAuth, (req,res) => {
  res.status(200).send('Valid token. Access granted!');
});

auth.get('/protected-route', bearerAuth, acl('delete'), (req,res) => {
  res.status(200).send('You are signed in and have proper permissions');
})

module.exports = auth;