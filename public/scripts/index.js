//script/index.js
var request = require('request');

module.exports = {
  index: function(req, res) {
    res.render('index');
  },
  login: function(req, res) {
    res.render('login');
  },
  confmLogin: function(req, res) {
  	var data=req.body;
    var options = {
      url: 'http://127.0.0.1:2318/v1/login',
      method: 'POST',
      headers: {
        key: 'NAVNIV',
        userid: '2318'
      },
      form: data
    };
    
    request(options, function(err, response, body) {
        if (err) console.log('error'.error, err)
        res.render('index');
    });
  },
  verifyEmail: function(req, res) {
  	var data=req.body;
    var options = {
      url: 'http://127.0.0.1:2318/v1/emailCheck',
      method: 'POST',
      headers: {
        key: 'NAVNIV',
        userid: '2318'
      },
      form: data
    };
    console.log('option:',options);
    request(options, function(err, response, body) {
        if (err) {console.log('error    '.error, err);
          res.status(400).send(err);
        } else {
        	console.log("api resp:",body);
        	res.status(200).send(body);
        }
    });
  },
  register: function(req, res) { console.log("123",req.body);
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
        if (err) {console.log('error    '.error, err);}
        /*else if(body[0] === '[')
        {*/
        	console.log(body);
        	body=JSON.parse(body);
			res.status(200).send(body);
		/*} */      
        
    });
  }
};
