var mongoose = require('mongoose');
var User = require('../models/user');

var databaseUri = require('../config/db')('development');
mongoose.connect(databaseUri);

User.collection.drop();

User.create([
  {
    username: "BexB",
    email: "bexbolton.webdev@gmail.com",
    password: "password",
    passwordConfirmation: "password"
  },{
    username: "SteveyBoi",
    email: "DaKilla98@gmail.com",
    password: "password",
    passwordConfirmation: "password"
  },{
    username: "KatLady",
    email: "ilovecats@gmail.com",
    password: "password",
    passwordConfirmation: "password"
  }
], function(err, users) {
    console.log(users.length + " users created!");

    mongoose.connection.close();
  });