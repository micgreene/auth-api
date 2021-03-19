'use strict';

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//setup an "App Secret" to sign our token
const SECRET = process.env.APP_SECRET || 'cool';//defined by app not user

const users = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  roles: {type: String, required: true, default: 'user', enum: ['user', 'editor', 'admin']}
}, { toJSON: { virtuals: true}});

const appSecret = process.env.APP_SECRET || 
users.virtual('token').get(function(){
  let token = {
    username: this.username
  }
  return jwt.sign(token, SECRET);//this will create a "token" for us, which oncludes our username and PW
})

users.virtual('capabilities').get(function(){
  let act = {
    user: ['read'],
    editor: ['read', 'create', 'update'],
    admin: ['read', 'create', 'update', 'delete']
  }
  return act[this.role];
})

users.pre('save', async function(){
  this.password = await bcrypt.hash(this.password, 10); //bcrypt hashes password for security
});

//example
// let bob = new users();

// users.save({ username: 'bob', password: '12345' }) ---> password is hashed before saving to database

users.statics.authenticateBasic = async function (username, password){
  const user =await this.findOne({ username });
  const valid =await bcrypt.compare(password, user.password); //plaintext password compared to hashed password, returns true or false
  if(valid){ return user; }
  
  throw new Error('invalid username or password');//since Error has a parameter, this should call the error handler middleware
}

//meant to find a user in the database given the data passed from the token
users.statics.authenticateToken = async function(token){
  try{
    const parsed = await jwt.verify(token, SECRET);
    const user = await this.findOne({username: parsed.username})
    if(user) { return user; }
    throw new Error ('user not found');
  } catch(e){
      throw new Error('e.message')
  }
}

module.exports = mongoose.model('users', users);