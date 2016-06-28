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
<<<<<<< HEAD
=======
  	var data={email:'er.ashsingla@gmail.com',password:'asdfgh@123'};
>>>>>>> 7ad980fecd68ce9581e951f5153f3348635c8dae
    var options = {
      url: 'http://127.0.0.1:2318/v1/login',
      method: 'POST',
      headers: {
        key: 'NAVNIV',
        userid: '2318'
      },
<<<<<<< HEAD
      form: req.body
=======
      form: data
>>>>>>> 7ad980fecd68ce9581e951f5153f3348635c8dae
    };
    
    request(options, function(err, response, body) {
        if (err) console.log('error    '.error, err)
        res.status(200).send(body);
    });
  },
<<<<<<< HEAD
  register: function(req, res) {
=======
  register: function(req, res) { console.log("123",req.body);
>>>>>>> 7ad980fecd68ce9581e951f5153f3348635c8dae
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
<<<<<<< HEAD
        if (err) console.log('error    '.error, err)
        res.status(200).send(body);
=======
        if (err) {console.log('error    '.error, err);}
        /*else if(body[0] === '[')
        {*/
        	console.log(body);
        	body=JSON.parse(body);
			res.status(200).send(body);
		/*} */      
        
>>>>>>> 7ad980fecd68ce9581e951f5153f3348635c8dae
    });
  }
};
