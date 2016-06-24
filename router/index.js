var user = require('../public/scripts');
var error = require('./error');

module.exports = function(app) {
  app.get('/', user.index);

  app.get('/login', user.login);

  app.post('/register', user.register);

  app.get('/error', error);
};
