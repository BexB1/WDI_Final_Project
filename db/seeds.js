var mongoose = require('mongoose');
var User = require('../models/user');
var bluebird = require('bluebird');

var databaseUri = require('../config/db')(process.env.NODE_ENV || "development");
mongoose.connect(databaseUri);
mongoose.Promise = bluebird;

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