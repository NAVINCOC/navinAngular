var user = require('../public/scripts');
var error = require('./error');

module.exports = function(app) {
  app.get('/', user.index);

  app.get('/login', user.login);

  app.get('/error', error);
};
