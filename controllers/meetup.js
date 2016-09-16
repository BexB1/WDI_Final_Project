var request = require('request-promise');

function getEvents(req, res) {

  request.get({
    url: "https://api.meetup.com/2/open_events",
    qs: {
      key: process.env.MEETUP_API_KEY,
      lat: req.query.lat,
      lon: req.query.lng,
      category: req.query.category,
      radius: req.query.radius || 1,
      sign: true
    },
    json: true
  })
  .then(function(response) {
    res.status(200).json(response.results);
  })
  .catch(function(err) {
    console.log(err);
    res.status(500).json(err);
  })
}

function getCategories(req, res) {

  request.get({
    url: "https://api.meetup.com/2/categories",
    qs: {
      key: process.env.MEETUP_API_KEY,
      sign: true
    },
    json: true
  })
  .then(function(response) {
    res.status(200).json(response.results);
  })
  .catch(function(err) {
    console.log(err);
    res.status(500).json(err);
  })
}

module.exports = {
  getEvents: getEvents,
  getCategories: getCategories
}