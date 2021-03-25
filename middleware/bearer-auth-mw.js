'use strict';

const users = require('../models/user.js');

module.exports = async (req,res, next) => {
  // if(!req.headers.authorization){
  //   next('missing token in header!')
  // }

  // let token = req.headers.authorization.split(' ').pop();

  // users.authenticateToken(token).then(
  //   user => {
  //     req.user = user;
  //     next();
  //   }
  // ).catch( e => {
  //   next('e.message');
  // })

  try{
     if(!req.headers.authorization) throw new Error('missing token in headers!');

     const token = req.headers.authorization.split(' ').pop();
     const validUser = await users.authenticateToken(token);

     req.user = validUser;
     req.token = validUser.token;
     next();
  } catch (e) {
    next(e.message);
  }
}