var jwt = require('jsonwebtoken');
var User = require('../models/user');
var secret = require('../config/tokens').secret;

function userIndex(req, res) {
  User.find(function(err, user) {
    if(err) return res.status(500).json(err);
    return res.status(200).json(user);
  });
}

function userCreate(req, res) {
  User.create(req.body, function(err, user) {
    if(err) return res.status(400).json(err);
    return res.status(201).json(user);
  });
}

function userShow(req, res) {
  User.findById(req.params.id, function(err, user) {
    if(err) return res.status(500).json(err);
    if(!user) return res.status(404).json({ message: "Could not find a user with that id" });
    return res.status(200).json(user);
  });
}

function userUpdate(req, res) {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }, function(err, user) {
    if(err) return res.status(400).json(err);
    return res.status(200).json(user);
  });
}

function userDelete(req, res) {
  User.findByIdAndRemove(req.params.id, function(err) {
    if(err) return res.status(500).json(err);
    return res.status(204).send();
  });
}

module.exports = {
  index: userIndex,
  create: userCreate,
  show: userShow,
  update: userUpdate,
  delete: userDelete
}
