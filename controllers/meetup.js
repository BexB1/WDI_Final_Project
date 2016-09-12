var request = require('request-promise');

function getEvents(req, res) {
  request.get({ url: "http://api.meetup.com/self/events", 
    qs: { key: process.env.MEETUP_API_KEY },
    json: true
  })
  .then(function(response) {
    res.status(200).json(response)
  })
  .catch(function(err) {
    console.log(err);
    res.status(500).json(err);
  })
}

module.exports = {
  getEvents: getEvents
}