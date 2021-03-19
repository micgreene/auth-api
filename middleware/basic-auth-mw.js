'use strict';

const base64 = require('base-64');
const users = require('../models/user.js');

const { Error } = require('mongoose');

module.exports = (req, res, next) => {
  if(!req.headers.authorization){
    next('not authorized');
    return;
  }

  //split the authorization header into an array, then grab just the base64 encoded part out of it using .pop()
  let basic = req.headers.authorization.split(' ').pop();

  //
  let [user, pass] = base64.decode(basic).split(':');

  users.authenticateBasic(user, pass).then(user=>{
    req.user = user;
    next();
  }).catch( e => {
    next('user not valid!');
  })

  //req.user = await user
}


