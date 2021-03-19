'use strict';

//const { resolve } = require("node:path");

//function currying --> a function that returns a function
module.exports = (capability) => {
  return (req, res, next)=>{
    if(req.user.capabilities.includes(capability)){
      next();
    } else {
     // next('Unauthorized Access!');
    }
  }
}

//role('create')(); 