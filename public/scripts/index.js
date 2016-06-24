//script/index.js
var request = require('request');

module.exports = {
  index: function(req, res) {
    res.render('index');
  },
  login: function(req, res) {
    res.render('login');
  },
  register: function(req, res) {
  	var options = {
      url: 'http://127.0.0.1:2318/v1/register',
      method: 'POST',
      headers: {
        key: 'NAVNIV',
        userid: '2318'
      },
      form: req.body
    };
    
    request(options, function(err, response, body) {
        if (err) console.log('error    '.error, err)
        res.send(body);
    });
  }
};
