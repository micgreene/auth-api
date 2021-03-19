'use strict';

const express = require('express');
const mongoose = require('mongoose');

const morgan = require('morgan');
const basicAuth = require('../middleware/basic-auth-mw.js');
const bearerAuth = require('../middleware/bearer-auth-mw.js');
const acl = require('../middleware/acl-middleware.js');
const dotenv = require('dotenv');
const PORT = process.env.PORT || 3000;
const authRoutes = require('../routes/routes.js');



const app = express();
dotenv.config();

//app.use(express.static('./public'));//allows us to use public files
app.use(express.urlencoded({ extended: true }));
app.use(express.json());//allows us to pass json formatted data in the req body
app.use(authRoutes);
//app.use(morgan('dev'));//log request details of every incoming request to our app - just a better version of the 'logger' middleware we've been making

//sign up for account and user is created
// app.post('sign-up'), (req, res) => {
//   const user = new User(req.body);
//   user.save().then(user => {
//     res.status(200).send(user);//usually will redirect, just for example
//   });
// };

//sign in with user details
// app.post('/sign-in', basicAuth, (req, res) => {
//   res.status(200).json({ msg: 'signed-in successfully', user: req.user });
// });


//if authorized, allows user to access this route
// app.get('/user', bearerAuth, (req, res) => {
//   res.status(200).json({ msg: 'user authorized for access', user: req.user });
// });

  module.exports = {
    server: app,
    start: (port) => {
      if(!port) throw new Error('No PORT provided!');

      app.listen(port, ()=>{
        console.log(`Server Listening on PORT: ${port}`);
      })
    }
  }
