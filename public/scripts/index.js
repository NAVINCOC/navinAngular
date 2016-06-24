//script/index.js

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
      }
    };
console.log('options  ', options);
    console.log('req   ',req);
    request(options, function(err, response, data) {
        if (err) console.log('error    '.error, err)
        data = JSON.parse(data);
        res.send(res);
    });
  }
};
