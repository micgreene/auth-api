'use strict';

//bring in 3rd party dependencies
const mongoose = require('mongoose');


const server = require('./lib/server.js');
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/auth-api';


const mongooseOptions = { 
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useCreateIndex: true 
};

//mongoose.Schema({});

mongoose.connect(MONGODB_URI, mongooseOptions)
  .then(() => {
    server.start(PORT);
  });
