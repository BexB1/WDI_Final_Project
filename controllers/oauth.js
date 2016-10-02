var User = require('../models/user');
var request = require('request-promise');
var jwt = require('jsonwebtoken');
var secret = require('../config/tokens').secret;
var qs = require('qs');

function facebook(req, res) {
console.log(req);
  request.post({
    url: "https://graph.facebook.com/v2.5/oauth/access_token",
    qs: {
      client_id: process.env.FACEBOOK_API_KEY,
      client_secret: process.env.FACEBOOK_API_SECRET,
      code: req.body.code,
      redirect_uri: req.headers.origin + "/"
    },
    json: true
  })
  .then(function(access_token) {
    return request.get({
      url: "https://graph.facebook.com/v2.5/me?fields=id,email,name,picture",
      qs: access_token,
      json: true
    })
  })
  .then(function(profile) {
    return User.findOne({
      email: profile.email
    })
    .then(function(user) {
      if(user) {
        user.facebookId = profile.id;
        user.avatar = profile.picture.data.url;
      }
      else {
        user = new User({
          username: profile.name,
          email: profile.email,
          facebookId: profile.id,
          avatar: profile.picture.data.url
        });
      }
      return user.save();
    })
  })
  .then(function(user) {
    var payload = {
      _id: user._id,
      avatar: user.avatar,
      username: user.username
    }

    var token = jwt.sign(payload, secret, { expiresIn: '24h' });

    res.status(200).json({ token: token });
  })
  .catch(function(err) {
    console.log(err);
  })
}

module.exports = {
  facebook: facebook
}